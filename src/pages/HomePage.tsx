import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar.tsx";
import {fetchBooks} from "../store/bookSlice.ts";
import BookList from "../components/BookList.tsx";

function HomePage() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { books, error, loading, query, totalCount, currentPage, isEnd } = useSelector(
        (state: RootState)=> state.book
    )

    const handleSearch = (searchQuery:string) => {
        console.log(`handleSearch: ${searchQuery}`)
        dispatch(fetchBooks({ query: searchQuery, page:1}))
    }

    const handleLoadMore = () => {
        dispatch(fetchBooks({ query, page: currentPage + 1, loadMore: true }))
    }
    const handleBookClick = (book : {isbn:string}) => {
        const isbnId = book.isbn.split(' ')[0]  // 첫 번째 ISBN만 사용
        navigate(`/books/${isbnId}`)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">📚 도서 검색</h1>
                <SearchBar onSearch={handleSearch} loading={loading}/>

                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}

                {query && !loading && (
                    <p className="text-gray-600 mt-4 mb-2">
                        "{query}" 검색 결과 : {totalCount.toLocaleString()}건
                    </p>
                )}

                <div className="mt-6">
                    <BookList books={books} onBookClick={handleBookClick}/>
                </div>

                {books.length > 0 && !isEnd && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100"
                        >
                            {loading ? '불러오는 중...' : '더 보기'}
                        </button>
                    </div>
                )}

                {isEnd && books.length > 0 && (
                    <p className="text-center text-gray-400 mt-6">모든 결과를 불러왔습니다</p>
                )}
            </div>
        </div>
    )
}
export default HomePage