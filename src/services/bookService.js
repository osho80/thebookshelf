import axios from 'axios'
import HttpService from './HttpService'


export const bookService = {
    query,
    getBookById,
    removeBook,
    saveBook,
    searchBook
    
}


async function query(filterBy){
    var querytStr = ''
    if(filterBy){
        querytStr += `?title=${filterBy.bookTitle}&price=${filterBy.bookPrice}&sale=${filterBy.isOnSale}`;
    }
    let books = await HttpService.get(`book${querytStr}`)
    return books
}

async function getBookById(id){
    console.log('id in bookService: ', id);
    let book = await HttpService.get(`book/${id}`)
    return book
}

async function removeBook(id) {
    return await HttpService.delete(`book/${id}`)
}

async function saveBook(book){
    
    if(book._id){
        await HttpService.put(`book/${book._id}`, book) 
        
    } else {
        await HttpService.post(`book/`, book)
    }
    
    return book
}

async function searchBook(txt) {
    let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${txt}`) 
    return books.data.items
}

