/**
 * 布局组件
 */

import React from 'react';
import { Layout } from 'antd';
import Sider from '../sider/sider.jsx'
import Header from '../header/header.jsx'
import './layout.less'

const { Content } = Layout;

class LayoutComponent extends React.Component{
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
    }
    state = {
        collapsed: false,
    };
    toggle() {
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
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default LayoutComponent