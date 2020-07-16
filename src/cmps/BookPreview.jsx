import React from 'react';

export function BookPreview(props) {
    const { book, selectBook } = props

    return (
        (!book) ? <h3>Loading... </h3> :
            <article className="book-preview" onClick={() => selectBook(book._id)}>
                <img src={book.thumbnail} alt="" />
                <h4>{book.title}</h4>
                {book.authors && <h5 className="authors">{book.authors.map((author, Idx) => <span className="and" key={Idx}>{author} </span>)}</h5>}
                {book.listPrice && <h6>{book.listPrice.amount} {book.listPrice.currencyCode}</h6>}
                {book.listPrice.isOnSale && <img src="../assets/imgs/sale.png" className="sale" alt="sale" />}
            </article>
    )
}