import {useState} from "react";

interface Props {
    onSearch: (query:string) => void
    loading: boolean
}

function SearchBar({onSearch,loading}:Props) {
    const [text, setText] = useState('')

    const handleSubmit = () => {
        if(!text.trim()) return
        onSearch(text)
    }
    return(
        <div className="flex gap-2">
            <input
                type="text"
                value={text}
                onChange={(e)=> setText(e.target.value)}
                onKeyDown={(e)=> e.key === 'Enter' && handleSubmit()}
                placeholder="책 제목을 입력하세요."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
                {loading ? '검색 중...' : '검색'}
            </button>
        </div>
    )
}
export default SearchBar