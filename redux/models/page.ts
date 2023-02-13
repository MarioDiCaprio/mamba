export interface PageResponse<T> {
    totalPages: number;
    index: number;
    size: number;
    content: Array<T>;
}
