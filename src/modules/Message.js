import React from 'react';

class Message extends React.Component{

    constructor(props){
        super(props);
        this.state = {message:''}
    }

    componentDidMount() {
        // 来自于路径 `/inbox/messages/:id`
        const id = this.props.params.id
        console.log(id)
        console.log(this.props.location.query._k)
        // fetchMessage(id, function (err, message) {
        //     this.setState({ message: message })
        // })
    }

    render(){
        return(
            <h2>hello, this is a message component</h2>
        )
    }
}

export default Message;