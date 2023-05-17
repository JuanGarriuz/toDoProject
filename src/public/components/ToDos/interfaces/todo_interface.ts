
export interface todo_interface {
    _id: string,
    _source: {
        state: string;
        title: string,
        description: string,
        date: number,
    }
}
