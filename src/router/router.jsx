import React,{Component} from 'react'
import { Switch, Route } from 'react-router-dom'

//引入页面组件
import Home from '../page/home/home.jsx' //首页
import ProductIndex from '../page/product-index/product-index' //商品管理
import ProductCategory from '../page/product-category/product-category' //品类管理
import OrderIndex from '../page/order/order-index/order-index.jsx' //订单列表
import OrderDetail from '../page/order/order-detail/order-detail.jsx' //订单详情
import UserIndex from '../page/user/user-index.jsx' //用户列表

class RouteMap extends Component {
    render () {
        return (
            <Switch>
                <Route path='/index' component={Home}></Route>
                <Route path='/product-index' component={ProductIndex}></Route>
                <Route path='/product-category' component={ProductCategory}></Route>
                <Route path='/order-index' component={OrderIndex}></Route>
                <Route path='/order-detail' component={OrderDetail}></Route>
                <Route path='/user-index' component={UserIndex}></Route>
            </Switch>
        )
    }
}

export default RouteMap