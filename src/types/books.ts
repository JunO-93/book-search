export interface Book {
    title: string
    authors: string[]
    publisher: string
    thumbnail: string
    contents: string
    url: string
    isbn: string
    price: number
    sale_pirce: number
}

export interface BookSearchResponse {
    documents: Book[]
    meta: {
        total_count: number
        pageable_count: number
        is_end: boolean
    }
}