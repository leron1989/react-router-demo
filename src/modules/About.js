import React from 'react';
import { Link } from 'react-router';

class About extends React.Component{

    render(){
        return(
            <div>
                <h2>About</h2>
                <Link to="/message/aaaaaa">Message</Link>
                {this.props.children}
            </div>
        )
    }
}

export default About;