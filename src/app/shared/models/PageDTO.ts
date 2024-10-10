export interface PageDTO<T> {
	totalElements: number;
	totalPages: number;
	pageable: Pageable;
	numberOfElements: number;
	currentPage: number;
	size: number;
	first: boolean;
	last: boolean;
	content: T[];
}

export interface Pageable {
	pageNumber: number;
	pageSize: number;
	offset: number;
}