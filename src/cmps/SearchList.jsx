import React from 'react'
import { SearchPreview } from './SearchPreview.jsx' 

export function SearchList(props) {
    const {books, viewBook} = props;

    return (
        
        books.map((book, idx) => {
            return <SearchPreview book={book} key={idx} viewBook={viewBook}></SearchPreview>
            
        })
    )
    

}