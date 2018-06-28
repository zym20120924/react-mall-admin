/**
 * 布局组件
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Layout,Breadcrumb } from 'antd'
import Sider from '../sider/sider.jsx'
import Header from '../header/header.jsx'
import RouteMap from '../../router/router.jsx'
import './layout.less'

const { Content } = Layout;

const breadcrumbNameMap = {
    '/index': '首页',
    '/product-index': '商品管理',
    '/product-detail': '添加商品',
    '/add-product': '添加商品',
    '/category-index': '品类管理',
    '/add-category': '添加品类',
    '/order-index': '订单管理',
    '/order-detail': '订单详情',
    '/user-index': '用户管理',
};


class LayoutComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };
    }
    //logo切换
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const location = this.props.location;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = extraBreadcrumbItems;
        return (
            <Layout className='layout'>
                <Sider collapsed={this.state.collapsed} selectKey={this.props.location.pathname}></Sider>
                <Layout>
                    <Header collapsed={this.state.collapsed} toggle={this.toggle}></Header>
                    <Breadcrumb>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
                        <RouteMap></RouteMap>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default LayoutComponent