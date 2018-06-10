import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../page/login/login.jsx'
import Index from '../page/index/index.jsx'

class RouteMap extends React.Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/index' component={Index}></Route>
                </Switch>
            </Router>
        )
    }
}

export default RouteMap