import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = ({match}) => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to={`${match.url}/public`}>Public Page</Link>
        </li>
        <li>
          <Link to={`${match.url}/protected`}>Protected Page</Link>
        </li>
      </ul>
      <Route path={`${match.url}/public`} component={Public} />
      <Route path={`${match.url}/login`} component={Login} />
      <PrivateRoute exact path={`${match.url}/protected`} component={Protected} />
    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/redirects"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

/**
 * 改写Route组件
 * Component为PrivateRoute中component属性指向的组件
 * ...rest为PrivateRoute的其它属性
 * 
 * 如果fakeAuth.isAuthenticated为true，则调用Protected组件
 * 如果fakeAuth.isAuthenticated为false，则重定向到"/login"
 * @param {*} param0 
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
	console.log(Component) //结果是：<Protected />组件
	console.log(rest); //结果是：{"exact": true, "path": "/protected"}
	console.log({...rest}); //结果是：{"exact": true, "path": "/protected"}
	//rest 等价于 {...rest}

	console.log(fakeAuth.isAuthenticated);

	
    return (
      	<Route
			{...rest}
			render={props => {
				console.log(props) //结果为：Object { match: {…}, location: {…}, history: {…}, staticContext: undefined }
				return fakeAuth.isAuthenticated ? (
				<Component {...props} />
				) : (
				<Redirect
					to={{
					pathname: '/redirects/login',
					state: { from: props.location }
					}}
				/>
				)
			}
			}
      	/>
    )
};

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false
        };
    }

    login(){
        fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true });
        });
    };

    render() {
		console.log(this.props.location.state) //结果为：from: Object { pathname: "/protected", search: "", key: "2r5yk0", … }
		const { from } = this.props.location.state || { from: { pathname: "/redirects" } };
		console.log(from) //结果为：Object { pathname: "/protected", search: "", hash: "", state: undefined, key: "2r5yk0" }
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
        	return <Redirect to={from} />;
        }

        return (
			<div>
				<p>You must log in to view the page at {from.pathname}</p>
				<button onClick={this.login.bind(this)}>Log in</button>
			</div>
        );
    }
}

export default AuthExample;
