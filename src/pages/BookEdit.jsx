import React, {Component} from 'react';
import history from '../history.js';
import cloudinary from '../services/cloudinaryService.js'
import { connect } from 'react-redux';
import { loadBook, saveBook } from '../store/actions/bookActions.js'


class BookEdit extends Component{
    state = {
        book: {
            title: '',
            subtitle: '',
            authors: [],
            publishedDate: '',
            description: '',
            pageCount: '',
            categories: [],
            language: '',
            listPrice: { amount: '', currencyCode: '', isOnSale: '' },
            thumbnail: ''
        }
    }
    

    componentDidMount() {
        this.loadBook();
    }

    async loadBook() {
        let { id } = this.props.match.params
        
        if(!id) return
        await this.props.loadBook(id)
        this.setState({ book: this.props.book }, console.log('state: ', this.state)
        )
        
    }

    onUploadImg = async(ev) => {
        console.log('cloudinary: ', ev);
        let res = await cloudinary.uploadImg(ev)
        let url = res.data.url
        console.log('Url: ', url);
        this.setState(prevState => ({ book: { ...prevState.book, thumbnail: url } }))
    }


    handleChange = ({target}) =>{
        const field = target.name
        let value = (target.type === 'number') ? parseInt(target.value) : target.value
        if (field === "amount") {
            
            this.setState(prevState => ({ book: { ...prevState.book, listPrice: { ...prevState.book.listPrice, [field]: value } } }))
        } 
        if (field === "authors" || field === "categories") {
            value = value.split(",");
            
            this.setState(prevState => ({ book: { ...prevState.book, [field]: value } } ))
        }
        else {
            this.setState(prevState => ({ book: { ...prevState.book, [field]: value } }))
        }
    }

    onSave = async (ev) => {
        ev.preventDefault();
        let book = this.state.book
        console.log('Saving: ', book);
        await this.props.saveBook(book)
        history.push('/book')
        
    }

    render(){
        const { book } = this.state
        
        return(
            (!book) ? <h3>Loading</h3> :
            
            <div className="edit-page">
                <img src="../assets/imgs/undo2.png" className="back-btn" title="Go back" onClick={()=> this.props.history.goBack()} alt="back" />
                <div className="book-edit flex">
                    <section className="book-img">
                        <img src={book.thumbnail} alt=""></img>
                    </section>
                    <section className="edit-form">
                        <form onSubmit={this.onSave}>
                            <div className="edit-input">
                                <label>
                                    Title
                                </label>
                                <input type="text" value={book.title} name="title" onChange={this.handleChange}/>
                            </div>
                            <div className="edit-input">
                                <label>
                                    Price
                                </label>
                                <input type="number" name="amount" value={book.listPrice.amount} onChange={this.handleChange} />
                            </div>
                            <div className="edit-input">
                                <label>
                                    Subtitle
                                </label>
                                <input type="text" name="subtitle" value={book.subtitle} onChange={this.handleChange} />
                            </div>
                            <div className="edit-input">
                                <label>
                                    Authors
                                </label>
                                <input type="text" name="authors"  value={book.authors} onChange={this.handleChange} placeholder="Comma separated-no space" />
                            </div>
                            <div className="edit-input">
                                <label>
                                    Publish Date
                                </label>
                                <input type="text" name="publishedDate" value={book.publishedDate} onChange={this.handleChange} />
                            </div>
                            <div className="edit-input">
                                <label>
                                    Page Count
                                </label>
                                <input type="text" name="pageCount" value={book.pageCount} onChange={this.handleChange} />
                            </div>
                            <div className="edit-input">
                                <label>
                                    Categories
                                </label>
                                <input type="text" name="categories" value={book.categories} onChange={this.handleChange} placeholder="Comma separated-no space"/>
                            </div>
                            <div className="edit-input">
                                <label>
                                    Language
                                </label>
                                <input type="text" name="language" value={book.language} onChange={this.handleChange} />
                            </div>
                            <div className="edit-input desc-text">
                                <label>
                                    Description
                                </label>
                                <textarea  name="description" rows="5" cols="50" value={book.description} onChange={this.handleChange} />
                            </div>
                            <div className="edit-input">
                                <img src="../assets/imgs/photography-icon.png" className="upload-btn" title="Upload" alt="upload" />
                                <input onChange={this.onUploadImg} type="file" />
                            </div>
                            <button>
                                <img src="../assets/imgs/save.png" className="book-save" title="Save" alt="save" />
                            </button>

                        </form>
                    
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
    saveBook
}

export default connect(mapStateToProps, mapDispatchToProps)(BookEdit)