import React from 'react';

class Topic extends React.Component{

    componentDidMount() {
        // const topicId = this.props.params.topicId;
        console.log(this.props.match.params.topicId)
    }

    render(){
        return(
            <div>
                <h3>{this.props.match.params.topicId}</h3>
            </div>
        )
        
    }
}

// const Topic = ({ match }) => (
//     <div>
//       <h3>{match.params.topicId}</h3>
//     </div>
// )

export default Topic;