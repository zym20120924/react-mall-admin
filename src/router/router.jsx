import React,{Component} from 'react'
import { Switch, Route } from 'react-router-dom'

//引入页面组件
import Home from '../page/home/home.jsx' //首页
import ProductIndex from '../page/product/product-index/product-index.jsx' //商品管理
import AddProduct from '../page/product/add-product/add-product.jsx' //添加商品
import ProductDetail from '../page/product/product-detail/product-detail.jsx' //商品详情
import Category from '../page/category/category/category.jsx' //品类管理
import AddCategory from '../page/category/add-category/add-category.jsx' //添加品类
import OrderIndex from '../page/order/order-index/order-index.jsx' //订单列表
import OrderDetail from '../page/order/order-detail/order-detail.jsx' //订单详情
import UserIndex from '../page/user/user-index.jsx' //用户列表

class RouteMap extends Component {
    render () {
        return (
            <Switch>
                <Route path='/index' component={Home}></Route>
                <Route path='/product-index' component={ProductIndex}></Route>
                <Route path='/add-product' component={AddProduct}></Route>
                <Route path='/product-detail' component={ProductDetail}></Route>
                <Route path='/category-index/:categoryId?' component={Category}></Route>
                <Route path='/category-index/add-category' component={AddCategory}></Route>
                <Route path='/order-index' component={OrderIndex}></Route>
                <Route path='/order-detail' component={OrderDetail}></Route>
                <Route path='/user-index' component={UserIndex}></Route>
            </Switch>
        )
    }
}

export default RouteMap