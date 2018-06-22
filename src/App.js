import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './page/login/login.jsx'
import Layout from './components/layout/layout.jsx'
import './style/reset.less'

const LayoutRouter = (
    <Layout></Layout>
)

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </Router>

        );
    }
}

export default App;
