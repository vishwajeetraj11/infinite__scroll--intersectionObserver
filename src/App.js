import React, {useState, useRef, useCallback} from "react"
import './App.css';
import useBookSearch from "./useBookSearch"
function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const {books, hasMore, loading, error} = useBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && hasMore){
          setPageNumber(p => p+1)
          console.log("Visible!");
        }
    })
    if(node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasMore])

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }
  return (
    <div className="App">
    <input type="text" value={query} onChange={handleSearch}></input>
    {books.map((book, index) => {
      if(books.length === index + 1) {
        return <div ref={lastBookElementRef} style={{color: "#fff",marginTop: "10px", backgroundColor: "crimson", padding: "10px"}} key={book}>{book}</div>
      }
      return <div style={{color: "#fff", backgroundColor: "crimson", padding: "10px", marginTop: "10px"}} key={book}>{book}</div>
    })}
    {loading && <div style={{color: "#fff",marginTop: "15px", backgroundColor: "green", padding: "10px"}}>Loading...</div>}
    {error && <div>Error</div>}
    </div>
  );
}

export default App;
