import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const CustomLinkExample = ({match}) => (
  <Router>
    <div>
      <OldSchoolMenuLink activeOnlyWhenExact={true} to={`${match.url}`} label="Home"/>
      <OldSchoolMenuLink to={`${match.url}/about`} label="About"/>
      <hr/>
      <Route exact path={`${match.url}`} component={Home}/>
      <Route path={`${match.url}/about`} component={About}/>
    </div>
  </Router>
)

/**
 * Route children 不管是否匹配都能显示
 * @param {*} param0 
 */
const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => {
	console.log({ label, to, activeOnlyWhenExact })
	return(
		<Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
			console.log(match)
			return(
				<div className={match ? 'active' : ''}>
				{match ? '> ' : ''}<Link to={to}>{label}</Link>
				</div>
			)
		}}/>
	)
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

export default CustomLinkExample