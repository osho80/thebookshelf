import React from 'react';

import { BookPreview } from './BookPreview.jsx'

export function BookList(props){
    const {books, selectBook} = props;

    return(
        <section className="book-list flex wrap">
        {books.map((book, idx) => {
            return <BookPreview book={book} key={idx} selectBook={selectBook}></BookPreview>
            
        })}
        </section>
    )
    
}
