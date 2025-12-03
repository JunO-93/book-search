import {useNavigate, useParams} from "react-router-dom";
import type {RootState} from "../store";
import {useSelector} from "react-redux";

function DetailPage() {
    const {isbn} = useParams()
    const navigate = useNavigate()
    const book = useSelector((state: RootState)=>
        state.book.books.find((b)=> b.isbn.split(' ')[0] === isbn)
    )

    if (!book) {
        return (
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <p className="text-gray-500 mb-4">책 정보를 찾을 수 없습니다</p>
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-500 hover:underline"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-2xl mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-500 hover:underline mb-6"
                >
                    ← 뒤로가기
                </button>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex gap-6">
                        {book.thumbnail ? (
                            <img
                                src={book.thumbnail}
                                alt={book.title}
                                className="w-32 h-44 object-cover rounded shadow"
                            />
                        ) : (
                            <div className="w-32 h-44 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
                            <p className="text-gray-600 mb-1">저자: {book.authors.join(', ')}</p>
                            <p className="text-gray-600 mb-4">출판사: {book.publisher}</p>

                            {book.sale_pirce > 0 ? (
                                <div>
                                    <span className="line-through text-gray-400 mr-2">
                                        {book.price.toLocaleString()}원
                                    </span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {book.sale_pirce.toLocaleString()}원
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xl font-bold">
                                    {book.price.toLocaleString()}원
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="font-bold text-lg mb2">책 소개</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {book.contents || '소개 내용이 없습니다.'}
                        </p>
                    </div>
                    <a
                        href={book.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-block mt-6 px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500"
                    >
                        카카오에서 보기
                    </a>
                </div>
            </div>
        </div>
    )
}
export default DetailPage