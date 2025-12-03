import type {Book} from "../types/books.ts";

interface Props{
    book: Book
    onClick:() => void
}

function BookCard({book,onClick}:Props) {
    return(
        <div
            onClick={onClick}
            className="flex gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-400"
        >
            {
                book.thumbnail ? (
                    <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="w-20 h-28 rounded"
                    />
                ) : (
                    <div
                        className="w-20 h-28 bg-gray-400 rounded flex items-center justify-center text-gray-400 text-xs"
                    >
                        No Image
                    </div>
                )
            }
            <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-1">
                    {book.authors.join(', ')} | {book.publisher}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2">
                    {book.contents}
                </p>
                {book.sale_pirce > 0 ? (
                    <p className="mt-2 text-blue-600 font-bold">
                        {book.sale_pirce.toLocaleString()}
                    </p>
                ): (
                    <p className="mt-2 text-gray-600">
                        {book.price.toLocaleString()}
                    </p>
                )
                }
            </div>
        </div>
    )
}

export default BookCard