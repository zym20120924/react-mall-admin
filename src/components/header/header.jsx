/**
 * 头部
 */
import React from 'react'
import {Link} from 'react-router-dom'
import { Layout,Icon,Dropdown, Menu } from 'antd';
import './header.less'
const { Header } = Layout;


class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    toggle = () => {
        this.props.toggle();
    }
    render () {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to='/login'>退出登录</Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className='header' style={{ background: '#fff', padding: 0 }}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <Dropdown  overlay={menu} placement="bottomCenter">
                    <p className='login-box'>
                        <span><Icon type="user" /><span className='text'>欢迎登录&nbsp;:&nbsp;admin</span><Icon type="caret-down" /></span>
                    </p>

                </Dropdown>


            </Header>
        )
    }
}

export default HeaderComponent