import React from 'react'


export default class BookFilter extends React.Component{
    state = {
        filter: {
            bookTitle: '',
            bookPrice: 1000000,
            isOnSale: false,
        }
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        value = ev.target.type === 'checkbox' ? ev.target.checked : value;
        this.setState(prevState => ({ filter: { ...prevState.filter, [name]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
        })
        
    }

    render() {
        return (
            <section className="book-filter flex align-center space-between"> 
                <input type="text" className="title-input" name="bookTitle" placeholder="Search by title" value={this.state.bookTitle} onChange={this.handleChange}/>
                <input type="number" className="price-input" name="bookPrice" placeholder="Price filter" value={this.state.bookPrice} onChange={this.handleChange}/>
                <label className="sale-filter">
                    On Sale:
                    <input type="checkbox" name="isOnSale" value={this.state.isOnSale} onChange={this.handleChange}/>
                </label>
            </section>
        )
    }



}

