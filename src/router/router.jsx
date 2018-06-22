import React,{Component} from 'react'
import { Switch, Route } from 'react-router-dom'

//引入页面组件
import Home from '../page/home/home.jsx'
import ProductIndex from '../page/product-index/product-index'
import ProductCategory from '../page/product-category/product-category'
import OrderIndex from '../page/order/order-index.jsx'
import UserIndex from '../page/user/user-index.jsx'

class RouteMap extends Component {
    render () {
        return (
            <Switch>
                <Route path='/index' component={Home}></Route>
                <Route path='/product-index' component={ProductIndex}></Route>
                <Route path='/product-category' component={ProductCategory}></Route>
                <Route path='/order-index' component={OrderIndex}></Route>
                <Route path='/user-index' component={UserIndex}></Route>
            </Switch>
        )
    }
}

export default RouteMap