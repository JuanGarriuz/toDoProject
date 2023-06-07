const { schema } = require('@osd/config-schema');

const mockContext = {
    core: {
        opensearch: {
            client: {
                asCurrentUser: {
                    indices: {
                        exists: jest.fn(),
                        create: jest.fn(),
                    },
                },
            },
        },
    },
};

const mockRequest = {
    query: {
        toDoState: 'pending',
        offSet: 0,
        size: 10,
        sortOrder: 'dateDesc',
    },
};

const mockResponse = {
    body: null,
    status: jest.fn(),
};

const routeHandler = require('../routes/index').handler;

describe('GET /api/custom_plugin/getToDos', () => {
    it('should create index if it does not exist', async () => {
        mockContext.core.opensearch.client.asCurrentUser.indices.exists.mockResolvedValue({ body: false });
        mockContext.core.opensearch.client.asCurrentUser.indices.create.mockResolvedValue({});

        await routeHandler(mockContext, mockRequest, mockResponse);

        expect(mockContext.core.opensearch.client.asCurrentUser.indices.exists).toHaveBeenCalledWith({ index: 'todos' });
        expect(mockContext.core.opensearch.client.asCurrentUser.indices.create).toHaveBeenCalledWith({ index: 'todos' });
    });

    it('should not create index if it already exists', async () => {
        mockContext.core.opensearch.client.asCurrentUser.indices.exists.mockResolvedValue({ body: true });
        mockContext.core.opensearch.client.asCurrentUser.indices.create.mockResolvedValue({});

        await routeHandler(mockContext, mockRequest, mockResponse);

        expect(mockContext.core.opensearch.client.asCurrentUser.indices.create).not.toHaveBeenCalled();
    });

    it('should handle sorting based on sortOrder', async () => {
        const mockSortQuery = [{ date: { order: 'desc' } }];

        mockContext.core.opensearch.client.asCurrentUser.indices.exists.mockResolvedValue({ body: false });
        mockContext.core.opensearch.client.asCurrentUser.indices.create.mockResolvedValue({});

        await routeHandler(mockContext, mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.body).toEqual(mockSortQuery);
    });

    it('should handle unknown sortOrder', async () => {
        const unknownSortOrder = 'unknownSortOrder';

        mockContext.core.opensearch.client.asCurrentUser.indices.exists.mockResolvedValue({ body: false });
        mockContext.core.opensearch.client.asCurrentUser.indices.create.mockResolvedValue({});

        const requestWithUnknownSortOrder = {
            ...mockRequest,
            query: {
                ...mockRequest.query,
                sortOrder: unknownSortOrder,
            },
        };

        await routeHandler(mockContext, requestWithUnknownSortOrder, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.body).toEqual([]);
    });

    it('should handle errors when checking index existence', async () => {
        const mockError = new Error('Index existence check failed');

        mockContext.core.opensearch.client.asCurrentUser.indices.exists.mockRejectedValue(mockError);

        await routeHandler(mockContext, mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.body).toEqual({ error: 'Internal Server Error' });
        expect(console.log).toHaveBeenCalledWith(mockError);
    });
});
