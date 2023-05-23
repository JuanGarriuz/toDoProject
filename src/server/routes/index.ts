import { schema } from '@osd/config-schema';
import { IRouter } from '../../../../src/core/server';
import { SearchSortOrder, SearchFieldSort } from '@opensearch-project/opensearch/api/types';

export function defineRoutes(router: IRouter) {

  router.get(
    {
      path: '/api/custom_plugin/getToDos',
      validate: {
        query: schema.object({
          toDoState: schema.string(),
          offSet: schema.number(),
          size: schema.number(),
          sortOrder: schema.string(),
        }),
      }
    },
    async (context, request, response) => {
      const { toDoState, offSet, size, sortOrder } = request.query;
      // Check if the index exists
      try {
        const existsIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: "todos"
        });

        if (!existsIndex.body) {
          await context.core.opensearch.client.asCurrentUser.indices.create({
            index: "todos",
          });
        }
      } catch (errExists) {
        console.log(errExists);
      }
      var sortQuery:SearchSortOrder | SearchFieldSort;
      if(sortOrder=="desc"){
        sortQuery = "desc";
      }else{
        sortQuery = "asc"
      }
      const responseItems = await context.core.opensearch.client.asCurrentUser.search({
        size: size >= 5 ? size : 5,
        from: offSet,
        index: "todos",
        body: {
          query: {
            match: {
              state: toDoState,
            },
          },
          sort: [{ "date": sortQuery }],
        },
      });

      return response.ok({
        body: {
          toDos: responseItems.body.hits.hits,
          totalHits: responseItems.body.hits.hits.length
        },
      });
    }
  );

  router.post(
    {
      path: '/api/custom_plugin/postToDo',
      validate: {
        body: schema.object({
          title: schema.string(),
          description: schema.string(),
          state: schema.string()
        })
      }
    },
    async (context, request, response) => {
      try {
        const existsIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: "todos"
        });

        if (!existsIndex.body) {
          await context.core.opensearch.client.asCurrentUser.indices.create({
            index: "todos",
          });
        }
      } catch (errExists) {
        console.log(errExists);
      }
      const responseItems = await context.core.opensearch.client.asCurrentUser.index({
        index: 'todos',
        refresh: true,
        body: {
          title: request.body.title,
          description: request.body.description,
          state: request.body.state,
          date: new Date().getTime(),
        }
      });
      return response.ok({
        body: {
          data: request.body,
          response: responseItems
        },
      });
    }
  );

  router.put(
    {
      path: '/api/custom_plugin/updateToDo',
      validate: {
        body: schema.object({
          _id: schema.string(),
          title: schema.string(),
          description: schema.string(),
          state: schema.string()
        })
      }
    },
    async (context, request, response) => {
      try {
        const existsIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: "todos"
        });

        if (!existsIndex.body) {
          await context.core.opensearch.client.asCurrentUser.indices.create({
            index: "todos",
          });
        }
      } catch (errExists) {
        console.log(errExists);
      }
      const responseItems = await context.core.opensearch.client.asCurrentUser.update({
        index: 'todos',
        refresh: true,
        id: request.body._id,
        body: {
          doc: {
            title: request.body.title,
            description: request.body.description,
            state: request.body.state
          }
        },
      });

      return response.ok({
        body: {
          data: request.body,
          update: responseItems
        },
      });
    }
  );

  router.delete(
    {
      path: '/api/custom_plugin/deleteToDo',
      validate: {
        body: schema.object({
          _id: schema.string(),
        })
      }
    },
    async (context, request, response) => {
      try {
        const existsIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: "todos"
        });

        if (!existsIndex.body) {
          await context.core.opensearch.client.asCurrentUser.indices.create({
            index: "todos",
          });
        }
      } catch (errExists) {
        console.log(errExists);
      }
      const responseItems = await context.core.opensearch.client.asCurrentUser.delete({
        index: 'todos',
        id: request.body._id,
        refresh: true
      });
      return response.ok({
        body: {
          data: request.body,
          delete: responseItems
        },
      });
    }
  );


}

