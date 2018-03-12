import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt
} from 'react-router-dom'

const PreventingTransitionsExample = ({match}) => (
  <Router>
    <div>
      <ul>
        <li><Link to={`${match.url}`}>Form</Link></li>
        <li><Link to={`${match.url}/one`}>One</Link></li>
        <li><Link to={`${match.url}/two`}>Two</Link></li>
      </ul>
      <Route path={`${match.url}`} exact component={Form}/>
      <Route path={`${match.url}/one`} render={() => <h3>One</h3>}/>
      <Route path={`${match.url}/two`} render={() => <h3>Two</h3>}/>
    </div>
  </Router>
)

/**
 * Prompt组件：用于阻止跳转。
 * 它有一个必须的属性message，用于给用户提示信息
 * when属性用于判断是否要提示信息，当它的值是true时，会提示消息。当它的值为false时，不会提示消息
 */
class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isBlocking: false
        }
    }

  render() {
    const { isBlocking } = this.state
console.log(this.state)
    return (
      <form
        onSubmit={event => {
          event.preventDefault()
          event.target.reset()
          this.setState({
            isBlocking: false
          })
        }}
      >

      {/* 当表单信息变更isBlocking为true，此时切换至其他url会有提示信息 */}
        <Prompt
            when={isBlocking}
            message={location => {
                console.log(location)
                return (
                    `Are you sure you want to go to ${location.pathname}`
                )
            }}
        />

        <p>
          Blocking? {isBlocking ? 'Yes, click a link or the back button' : 'Nope'}
        </p>

        <p>
          <input
            size="50"
            placeholder="type something to block transitions"
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0
              })
            }}
          />
        </p>

        <p>
          <button>Submit to stop blocking</button>
        </p>
      </form>
    )
  }
}

export default PreventingTransitionsExample