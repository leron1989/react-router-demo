import React from 'react';
import ReactDOM from 'react-dom';

class Another extends React.Component{

    render(){
        return (
            <ul>
                <li>张三</li>
                <li>李四</li>
                <li>王五</li>
            </ul>
        )
    }
}

ReactDOM.render(
    <Another />,
    document.body
)