import type {Book} from "../types/books.ts";
import BookCard from "./BookCard.tsx";

interface Props {
    books: Book[]
    onBookClick: (book:Book) => void
}

function BookList({books,onBookClick}:Props) {
    if(books.length ===0){
        return <p className="text-center text-gray-400 py-10">검색 결과가 없습니다.</p>
    }
    return(
        <div className="flex flex-col gap-4">
            {books.map((book, index) => (
                <BookCard
                    key={`${book.isbn}-${index}`}
                    book={book}
                    onClick={()=> onBookClick(book)}/>
            ))}
        </div>
    )
}
export default BookList