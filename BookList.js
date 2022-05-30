import React from 'react';

const BookList = ({books, handleRemove, handleEdit}) => {

    return books.map(book => (
        <tr key={book.isbn}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.autor}</td>
            <td><button type="button" onClick={ () => handleRemove(book.isbn)}>Remove</button></td>
            <td><button type="button" onClick={ () => handleEdit(book.isbn)}>Update</button></td>
        </tr>
    ))
}

export default BookList;