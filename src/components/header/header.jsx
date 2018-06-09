/**
 * 头部
 */
import React from 'react'
import { Layout,Icon } from 'antd';
const { Header } = Layout;

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.props.toggle();
    }
    render () {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
            </Header>
        )
    }
}

export default HeaderComponent