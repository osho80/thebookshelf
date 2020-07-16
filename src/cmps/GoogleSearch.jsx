import React from 'react'

import { connect } from 'react-redux'
import { saveBook } from '../store/actions/bookActions.js'
import { bookService } from '../services/bookService.js'
import { SearchList } from './SearchList.jsx'
import { SearchSelected } from './SearchSelected.jsx'
import { UserMessage } from './UserMessage.jsx'
import history from '../history.js'


class GoogleSearch extends React.Component {
    state = {
        search: '',
        books: null,
        currBook: null,
        isMsg: false
    }

    handleChange = ({ target }) => {
        let search = target.value;
        this.setState({ search }, () => {
            this.onSearchGoogle()
        })
    }

    onSearchGoogle = async () => {
        let txt = this.state.search
        let books = await bookService.searchBook(txt)
        this.setState({ books })
    }

    viewBook = (currBook) => {
        const { toggleSearch } = this.props
        toggleSearch()
        this.setState({ currBook })
    }

    saveBookToStore = async (book) => {
        await this.props.saveBook(book)
        this.setState({
            isMsg: true,
            books: null,
            currBook: null,
            search: ''
        })
        const { toggleSearch } = this.props
        toggleSearch()
    }

    onCloseMessage = () => {
        this.setState({ isMsg: false })
        const { toggleSearch } = this.props
        toggleSearch()
        history.push('/book')
    }

    onToggleModal = () => {
        this.setState({ currBook: null})
    }

    closeSearch = ()=> {
        this.setState({ books: null, search: ''})
    }

    render() {
        const { books, currBook, isMsg } = this.state
        
        return (
            <section className="book-search flex column">
                <input type="text" name="search" className="google-input" placeholder="Search Google Books" value={this.state.search} onChange={this.handleChange} />
                {books && <section className="search-results">
                    <img src="../assets/imgs/2-arrows-pointing.png" className="close-search" title="close" onClick={()=> this.closeSearch()} alt="close"/>
                    <SearchList books={books} viewBook={this.viewBook}></SearchList>

                </section>}
                {currBook && <SearchSelected book={currBook} saveBookToStore={this.saveBookToStore} onToggleModal={this.onToggleModal}>
                </SearchSelected>}

                {isMsg && <UserMessage txt={'Your new book has been saved successfuly!'} onCloseMessage={this.onCloseMessage}>
                </UserMessage>}

            </section>
        )
    }

}


const mapDispatchToProps = {
    saveBook
}

export default connect(null, mapDispatchToProps)(GoogleSearch)
