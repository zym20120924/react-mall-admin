/**
 * 侧边导航
 */
import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import './sider.less'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderComponent extends React.Component {
    render () {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                width={260}
                className='sider'
            >

                <Router>
                    <div>
                        <Link className="logo" to='/'>
                            <b>HAPPY</b>
                            MMALL
                        </Link>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to='/index'>
                                    <Icon type="user" />
                                    <span>首页</span>
                                </Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>商铺管理</span></span>}>
                                <Menu.Item key="2">
                                    <Link to='product-index'>
                                        <span>商铺管理</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to='product-category'>
                                        <span>品类管理</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>订单</span></span>}>
                                <Menu.Item key="4">
                                    <Link to='order-index'>
                                        <span>订单管理</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>用户</span></span>}>
                                <Menu.Item key="5">
                                    <Link to='user-index'>
                                        <span>用户管理</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>

                </Router>

            </Sider>
        )
    }
}

export default SiderComponent;