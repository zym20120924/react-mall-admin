/**
 * 侧边导航
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import './sider.less'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderComponent extends React.Component {

    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render () {
        //logo显示隐藏
        const logoShow = this.props.collapsed;
        let logo = null;
        if(!logoShow) {
            logo = <Link className="logo" to='/index'><b>HAPPY</b>MMALL</Link>
        }else {
            logo = <Link className="logo hide-logo" to='/index'><b>HAPPY</b></Link>
        }

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                width={260}
                className='sider'
            >
                <div>
                    {logo}
                    <Menu theme="dark"
                          mode="inline"
                          openKeys={this.state.openKeys}
                          onOpenChange={this.onOpenChange}
                          defaultSelectedKeys={['/index']}
                          // selectedKeys={[this.props.pathname]}
                    >
                        <Menu.Item key='/index'>
                            <Link to='/index'>
                                <Icon type="user" />
                                <span>首页</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>商铺管理</span></span>}>
                            <Menu.Item key="/product-index">
                                <Link to='/product-index'>
                                    <span>商铺管理</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/category-index">
                                <Link to='/category-index'>
                                    <span>品类管理</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>订单</span></span>}>
                            <Menu.Item key="/order-index">
                                <Link to='/order-index'>
                                    <span>订单管理</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>用户</span></span>}>
                            <Menu.Item key="/user-index">
                                <Link to='/user-index'>
                                    <span>用户管理</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </Sider>
        )
    }
}

export default SiderComponent;