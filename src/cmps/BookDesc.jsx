import React from 'react'


export class BookDesc extends React.Component {

    state = {
        isShortDesc: true,
        bookDesc: null,
    }


    componentDidMount() {
        const { bookDesc } = this.props
        //console.log('bookDesc', bookDesc);
        this.setState({ bookDesc })

    }

    toggleDesc = () => {
        const { isShortDesc } = this.state;
        this.setState({ isShortDesc: !isShortDesc })
    }

    get descParagraph() {
        const { isShortDesc, bookDesc } = this.state;
        if (!bookDesc) {
            return ''
        } else {
            let desc;
            let ext;
            if (isShortDesc) {
                desc = bookDesc.slice(0, 100)
                ext = '  Read more...'
                
            } else {
                desc = bookDesc
                ext = '  Read less...'
            }
            return (
                <>
                    <span style={{lineHeight: "1.3rem"}}>{desc}</span>
                    {(bookDesc.length > 100) && <span className="desc-ext" style={{fontWeight: "bold", fontStyle: "italic", fontSize: "0.8rem"}}>{ext}</span>}
                </>
            )
        }

    }    


    render() {
        const { bookDesc } = this.state

        return (
            (bookDesc && <article style={{cursor: "pointer"}} onClick={this.toggleDesc}>Description: {this.descParagraph}</article>)
        )
    }
}