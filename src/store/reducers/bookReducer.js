const initialState = {
    books: null,
    currBook: null,
    filterBy: null,
}

export default function BookReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_BOOKS':
            return {
                ...state,
                books: action.books
            }
        case 'SET_BOOK':
            return {
                ...state,
                currBook: action.book
            }
        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.book]
            }
        case 'UPDATE_BOOK': 
            return {
                ...state,
                
                books: state.books.map(book => {
                    
                    if(book._id === action.savedBook._id) return action.savedBook;
                    
                    return book
                })
            }
        case 'REMOVE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book._id !== action._id)
            }

        case 'SET_FILTER':
            return {
                ...state,
                filterBy: {...action.filterBy} }
        default:
            return state;
    }
}