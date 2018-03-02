/**
 * 通常我们在 React 的使用中，一般要引入两个包，react和 react-dom，
 * 那么react-router和react-router-dom是不是两个都要引用呢？
 * 注意，前方高能，入门第一坑就在这里。
 * 他们两个只要引用一个就行了，不同之处就是后者比前者多出了<Link> <BrowserRouter>这样的 DOM 类组件。
 * 因此我们只需引用react-router-dom这个包就OK了。当然，如果搭配redux，你还需要使用react-router-redux
 * 
 * 在4.0之前版本的 API 中，<Router> 组件的 children 只能是 React Router 提供的各种组件，
 * 如<Route>、<IndexRoute>、<Redirect>等。而在 React Router 4 中，
 * 你可以将各种组件及标签放进 <Router>组件中，他的角色也更像是 Redux 中的 <Provider>。
 * 不同的是<Provider>是用来保持与 store 的更新，而<Router>是用来保持与 location 的同步
 */
import React from 'react';
import ReactDOM from 'react-dom';
import About from './modules/About';
import Repos from './modules/Repos';
import Home from './modules/Home';
import Message from './modules/Message';

//写法一
// import {BrowserRouter as Router, Route, Link, IndexRoute, Redirect } from 'react-router-dom';
//写法二
import {HashRouter, Router, Route, Link, IndexRoute, Redirect } from 'react-router-dom';

class App extends React.Component{
	// constructor(props){
	// 	super(props);
	// 	this.state = {
	// 		route: window.location.hash.substr(1)
	// 	}
	// }

	// componentDidMount(){
	// 	window.addEventListener('hashchange', () => {
	// 		this.setState({
	// 			route:window.location.hash.substr(1)
	// 		})
	// 	})
	// }

	//组件将被卸载  
	// componentWillUnmount(){ 
    //     this.setState({
	// 		route:window.location.hash.substr(1)
	// 	})  
    // }

	render() {
		return (
			<div>
				<h1>Hello, React Router! Hello World! </h1>
				<ul>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/repos">Repos</Link></li>
				</ul>
				{this.props.children}
			</div>
		)
	}
};

/**
 * React 4.0之前版本Router写法
 * 和之前的Router不一样，这里<Router>组件下只允许存在一个子元素，如存在多个则会报错
 */
// ReactDOM.render(
//     <Router>
//         <Route path="/" component={App}>
//			   {/* React 4.0 IndexRoute API已调整*/}
//             <IndexRoute component={Home}/>
//             <Route path="repos" component={Repos} />
//             <Route path="about" component={About}>
//                 <Route path="/message/:id" component={Message}></Route>
//                 <Redirect from="message/:id" to="/message/:id"/>
//             </Route>
//         </Route>
//     </Router>, 
//     document.getElementById('app')
// );

/**
 * 写法二
 */
ReactDOM.render(
	<HashRouter>
		<App>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About}>
			{/* Warning: You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored */}
				{/* <Route path="/message/:id" component={Message}></Route>
				<Redirect from="message/:id" to="/message/:id"/> */}
			</Route>
			<Route path="/repos" component={Repos} />
		</App>
  	</HashRouter>,
    document.getElementById('app')
);