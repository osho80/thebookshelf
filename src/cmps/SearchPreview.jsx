import React from 'react'


export function SearchPreview(props){
    const {book, viewBook} = props;
    
    
    return (
        <article className="results-preview">
            <p onClick={()=> viewBook(book.volumeInfo)}>
                {book.volumeInfo.title}
            </p>
        </article>
    )
}