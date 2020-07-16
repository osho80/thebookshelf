import React from 'react'

export class UserMessage extends React.Component {
    

    render() {
        console.log('msg props: ', this.props);
        const { txt, onCloseMessage } = this.props
        
        
        return (
            <section className="message" style={{textAlign: "center", width: "75vw"}}>
                <h2>{txt}</h2>
                <img src="../assets/imgs/check-mark-black.png" className="confirm-save" title="Confirm" style={{width: "3rem"}} alt="message" onClick={()=> onCloseMessage()} />

            </section>
        )

    }
    

}        