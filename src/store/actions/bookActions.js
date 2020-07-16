import { bookService } from '../../services/bookService.js'


export function loadBooks(filterBy) {
    return async (dispatch)=> {
        let books = await bookService.query(filterBy)
        dispatch({ type: 'SET_BOOKS', books})
    }
}


export function loadBook(id) {
    return async dispatch => {
        let book = await bookService.getBookById(id)
        dispatch({ type: 'SET_BOOK', book})
    }
} 

export function removeBook(id) {
    return async dispatch=> {
        await bookService.removeBook(id)
        dispatch({ type: 'REMOVE_BOOK', id})
    }
}

export function saveBook(book){
    return async dispatch=> {

        const type = book._id ? 'UPDATE_BOOK' : 'ADD_BOOK';
        console.log('const type: ', type);
        let savedBook = await bookService.saveBook(book)
        console.log('Actions - saving dispatches: ', savedBook);

        dispatch({type, savedBook})
        
    }

}