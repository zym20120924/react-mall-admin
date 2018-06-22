/**
 * 布局组件
 */

import React from 'react';
import { Layout,Breadcrumb } from 'antd';
import Sider from '../sider/sider.jsx'
import Header from '../header/header.jsx'
import RouteMap from '../../router/router.jsx'
import './layout.less'

const { Content } = Layout;

class LayoutComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout className='layout'>
                <Sider collapsed={this.state.collapsed}></Sider>
                <Layout>
                    <Header collapsed={this.state.collapsed} toggle={this.toggle}></Header>
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
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