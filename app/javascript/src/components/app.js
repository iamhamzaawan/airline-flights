import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Airline from './Airline/airline'
import Airlines from './Airlines/airlines'

class App extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Airlines} />
        <Route exact path="/airlines/:slug" component={Airline} />
      </Switch>
    )
  }
}

export default App