import axios from 'axios'
import type {BookSearchResponse} from "../types/books.ts";

const kakaoApi = axios.create({
    baseURL: 'https://dapi.kakao.com',
    headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
    },
})

export const searchBooks = async (query: string, page: number = 1) => {
    const response = await kakaoApi.get<BookSearchResponse>('/v3/search/book',{
        params: {
            query,
            page,
            size: 10
        }
    })
    return response.data
}

