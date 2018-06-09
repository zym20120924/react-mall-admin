/**
 * 侧边导航
 */
import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import './sider.less'

const { Sider } = Layout


class SiderComponent extends React.Component {
    render () {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo" />
                <Router>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to='/index'>
                                <Icon type="user" />
                                <span>首页</span>
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to='product'>
                                <Icon type="video-camera" />
                                <span>商铺管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Router>

            </Sider>
        )
    }
}

export default SiderComponent;