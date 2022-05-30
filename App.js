import './App.css';
import React, {useState, useEffect} from 'react';
import './App.css';
import BookList from './Components/BookList';

function App() {

  const [books, setBooks] = useState([]); 
  
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');

  // Submit event
  const handleAddSubmit = (e) => {
    e.preventDefault();
    // Creating an object 
    let book = {
      title,
      autor, 
      isbn
    }

    setBooks([...books, book]);
    setTitle('');
    setIsbn('');
    setAutor('');

    // Set data in local Storage
      localStorage.setItem('book', JSON.stringify([...books, book]));
  }

  // Get data from Local storage

  useEffect(()=> {
    const data = JSON.parse(localStorage.getItem('book'))
    if(data) {
      setBooks(data); // Updates the state
    } 
  }, [])

  // Remove 
  const handleRemove = (isbn) => {
    const removedBook = localStorage.removeItem('book');
    setBooks(removedBook);
  }

  // Update
  const handleEdit = (isbn) => {
    const filteredItem = books.filter(books => books.isbn !== isbn);
    const selectedItem = books.find(books => books.isbn === isbn)

    // sets exit books value to the form
    setTitle(selectedItem.title)
    setIsbn(selectedItem.isbn)
    setAutor(selectedItem.autor)

    // removes the book from the list
    setBooks(filteredItem)
  }

  return (
    <div className="app">
     <h1>Book List</h1>
      <div className="main">
        <div className="form-container"> 
          <form className="form-group" onSubmit={handleAddSubmit}>
             <label>Title</label>
             <input type="text" className="form-control" require onChange={(e)=>setTitle(e.target.value)} value={title} required/>
             <br/>
             <label>Autor</label>
             <input type="text" className="form-control" require onChange={(e)=>setAutor(e.target.value)} value={autor} required/>
             <br/>
             <label>ISBN</label>
             <input type="text" className="form-control" require onChange={(e)=>setIsbn(e.target.value.toString())} value={isbn} required/>
             <br/>
             <button type="submit" className="btn-submit">Add Book</button>
          </form>
        </div>
        
        {/* View container - list of books */}

        <div className="view-container">
          <table className="table">
            <thead>
              <tr>
                <th>ISBN#</th>
                <th>Title</th>
                <th>Autor</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              <BookList books={books} handleRemove={handleRemove} handleEdit={handleEdit} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default App;
