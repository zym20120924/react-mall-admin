import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './page/login/login.jsx'
import Layout from './components/layout/layout.jsx'
import './style/reset.less'

//认证

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth : false, // 表示是否认证通过
        };
    }

    onLogin = (val) => {
        this.setState({
            auth: val,
        })
    }

    componentDidMount() {

    }

    render() {

        //登录拦截
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                this.state.auth ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}/>
                )
            )}/>
        )
        return (

            <Router>
                <Switch>
                    <Route  path='/login'
                            render={props => (<Login onLongin={this.onLogin} {...props} />
                    )}>
                    </Route>
                    {/*<Route path="/" component={Layout}></Route>*/}
                    <PrivateRoute path="/" component={Layout}/>
                </Switch>
            </Router>

        );
    }
}

export default App;
