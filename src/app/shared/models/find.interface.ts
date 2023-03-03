export interface IFind<T> {
  data: T[]
  meta: Meta
}

export interface Meta {
  pagination: Pagination
}

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
