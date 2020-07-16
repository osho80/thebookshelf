import React from 'react'
import { BookDesc } from './BookDesc.jsx'

export class SearchSelected extends React.Component {
    state = {
        isShortDesc: true,
        book: {
            title: '',
            subtitle: '',
            authors: [],
            publishedDate: '',
            description: '',
            pageCount: '',
            categories: [],
            language: '',
            thumbnail: '',
            listPrice: {}
        }
    }

    componentDidMount() {
        const { book } = this.props
        this.setState({
            book: {
                title: book.title,
                subtitle: book.subtitle,
                authors: book.authors,
                publishedDate: book.publishedDate,
                description: book.description,
                pageCount: book.pageCount,
                categories: book.categories,
                language: book.language,
                thumbnail: book.imageLinks.thumbnail,
                listPrice: { amount: 100, currencyCode: 'ILS', isOnSale: false }
            }
        })
    }

    
    get language() {
        const { book } = this.props
        switch(book.language){
            case 'en':
                return <span>English</span>
            case 'sp':
                return <span>Spanish</span>
            case 'he':
                return <span>Hebrew</span>
            default:
                return <span>{book.language}</span> || <span></span>
        }
    }

    
    render() {
        const { book, saveBookToStore, onToggleModal } = this.props
        
        return (
            (!book) ? <h3>Loading</h3> :
                <main className="view-selected">
                    <div className="selected-details flex">
                        <section className="side-bar flex column space-between">
                            <img src="../assets/imgs/add.png" className="exit-btn" title="Exit" onClick={() => onToggleModal()} alt="exit" />
                            <img className="book-img" src={book.imageLinks.thumbnail} alt=""></img>
                            <img src="../assets/imgs/save.png" className="google-save" title="Save" onClick={() => saveBookToStore(this.state.book)} alt="save" />
                        </section>
                        <section className="book-info">
                            <h3 className="title">{book.title}</h3>
                            <h4 className="subtitle">{book.subtitle}</h4>
                            {book.authors && <h4 className="authors">Authors: {book.authors.map((author, Idx) => <span className="and" key={Idx}>{author} </span>)}</h4>}
                            {book.description && <BookDesc bookDesc={book.description} />}
                            {book.categories && <p className="categories">Categories: {book.categories.map((category, Idx) => <span className="and" key={Idx}>{category}</span>)}</p>}
                            <p className="extra-details">
                                {book.pageCount && <span>{book.pageCount} Pages</span>} 
                                {this.language && <span> ({this.language})</span>}
                                {book.publishedDate && <span>, Published: {book.publishedDate}</span>}
                            </p>
                        </section>
                    </div>
                </main>
        )
    }
}

