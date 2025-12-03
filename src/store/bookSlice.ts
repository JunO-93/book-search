import type {Book} from "../types/books.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {searchBooks} from "../api/kakao.ts";

interface bookState {
    books: Book[]
    loading: boolean
    error: string | null
    totalCount: number
    currentPage: number
    query: string
    isEnd: boolean
}

const initialState: bookState = {
    books: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    query: '',
    isEnd: false
}

//비동기 액션
export const fetchBooks = createAsyncThunk(
    'book/fetchBooks',
    async({query,page,loadMore = false}:{query:string; page:number, loadMore?:boolean}) => {
        const response = await searchBooks(query,page)
        return {...response, query, page, loadMore}
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        clearBook: (state) => {
            state.books = []
            state.totalCount = 0
            state.currentPage = 1
            state.query = ''
            state.isEnd = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false
                // loadMore면 기존 목록에 추가, 아니면 새로 덮어쓰기
                if (action.payload.loadMore) {
                    state.books = [...state.books, ...action.payload.documents]
                } else {
                    state.books = action.payload.documents
                }
                state.query = action.payload.query
                state.currentPage = action.payload.page
                state.totalCount = action.payload.meta.total_count
                state.isEnd = action.payload.meta.is_end
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "검색 중 오류가 발생했습니다."
            })
    },
})

export const {clearBook} = bookSlice.actions
export default bookSlice.reducer
