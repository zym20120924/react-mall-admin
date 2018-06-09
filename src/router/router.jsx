import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../page/login/login.jsx'

class RouteMap extends React.Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                </Switch>
            </Router>
        )
    }
}

export default RouteMap