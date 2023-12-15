export interface IMain {
    message: string;
    rest: REST[];
}
export interface SMain {
    message: string;
    rest: REST;
}
export interface REST {
    id: string;
    content: string;
    createdAt: Date;
    authorId: string;
    isComplete: boolean;
}
