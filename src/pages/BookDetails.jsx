import React from 'react';
import history from '../history.js'
import { BookDesc } from '../cmps/BookDesc.jsx'
import { connect } from 'react-redux';
import { loadBook, removeBook } from '../store/actions/bookActions.js'



class BookDetails extends React.Component {

    componentDidMount() {
        this.loadBook();
    }

    async loadBook() {
        let { id } = this.props.match.params
        await this.props.loadBook(id)
    }

    async remove(id) {
        await this.props.removeBook(id)
        history.push('/book')

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
        const { book } = this.props

        return (
            (!book) ? <h3>Loading</h3> :
                <div className="details-page">
                    <div className="book-details">
                            <img src="../assets/imgs/undo2.png" className="detail-btns back" title="Go back" onClick={()=> this.props.history.goBack()} alt="back" />
                        <section className="book-img">
                            <img src={book.thumbnail} alt=""></img>
                            <div className="action-btns flex space-around">
                                <img src="../assets/imgs/trash.png" className="detail-btns trash" title="Delete" onClick={() => this.remove(book._id)} alt="delete" />
                                <img src="../assets/imgs/edit-txt.png" className="detail-btns edit" title="Edit" onClick={() => history.push(`/edit/${book._id}`)} alt="edit" />
                            </div>
                        </section>
                        <section className="book-info">
                            <h2 className="title">{book.title}</h2>
                            <h3 className="subtitle">{book.subtitle}</h3>
                            {book.authors && <h3 className="authors">Authors: {book.authors.map((author, Idx) => <span className="and" key={Idx}>{author} </span>)}</h3>}
                            {book.description && <BookDesc bookDesc={book.description} />}
                            {book.categories && <p className="categories">Categories: {book.categories.map((category, Idx) => <span className="and" key={Idx}>{category}</span>)}</p>}
                            <p>
                                {book.pageCount && <span>{book.pageCount} Pages</span>} 
                                {this.language && <span> ({this.language})</span>}
                                {book.publishedDate && <span>, Published: {book.publishedDate}</span>}
                            </p>
                            <p className="price">{book.listPrice.amount} {book.listPrice.currencyCode}</p>
                            {book.listPrice.isOnSale && <img src="../assets/imgs/sale.png" className="sale" alt="sale" />}

                        </section>
                    </div>
                </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        book: state.bookApp.currBook
    }
}

const mapDispatchToProps = {
    loadBook,
    removeBook
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails)