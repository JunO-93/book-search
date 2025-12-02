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
}

const initialState: bookState = {
    books: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    query: ''
}

//비동기 액션
export const fetchBooks = createAsyncThunk(
    'book/fetchBooks',
    async({query,page}:{query:string; page:number}) => {
        const response = await searchBooks(query,page)
        return {...response, query, page}
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
                state.books = action.payload.documents
                state.query = action.payload.query
                state.currentPage = action.payload.page
                state.totalCount = action.payload.meta.total_count
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "검색 중 오류가 발생했습니다."
            })
    },
})

export const {clearBook} = bookSlice.actions
export default bookSlice.reducer
