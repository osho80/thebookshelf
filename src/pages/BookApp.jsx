import React from 'react';
import { connect } from 'react-redux';
import { loadBooks } from '../store/actions/bookActions.js'
import BookFilter from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import GoogleSearch from '../cmps/GoogleSearch.jsx'
import history from '../history.js'


class BookApp extends React.Component {

    state = {
        isSearch: false
    }

    componentDidMount() {
        this.props.loadBooks();
    }

    toggleSearch = () => {
        let { isSearch } = this.state
        this.setState({ isSearch: !isSearch })
        if (!isSearch) {
            console.log('Reloading books...');

        } this.props.loadBooks();
    }

    selectBook = (id) => {
        history.push(`/book/${id}`)
    }

    render() {
        const { books } = this.props;

        return (

            <>
                <section className="action-center">
                    <BookFilter onSetFilter={this.props.loadBooks} />
                    <article className="google-addbtn flex align-center space-between column">
                        <GoogleSearch toggleSearch={this.toggleSearch}></GoogleSearch>
                        <img src="../assets/imgs/add.png" className="add-book" title="Manually Add Book" onClick={() => history.push('/edit')}alt="add"/>
                    </article>
                </section>
                {!books && <h2>Loading...</h2>}

                {books && <section className="main-container flex wrap">
                    <BookList books={this.props.books} selectBook={this.selectBook}></BookList>
                </section>}
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        books: state.bookApp.books,
    }
}

const mapDispatchToProps = {
    loadBooks
}

export default connect(mapStateToProps, mapDispatchToProps)(BookApp)