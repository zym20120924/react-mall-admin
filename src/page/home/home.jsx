import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Icon,message } from 'antd';
import { requestBaseCount } from '../../api/api.js'
import './home.less'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count:{}
        }
    }

    componentDidMount() {
        this._requestBaseCount()
    }

    //请求统计用户、商品、订单数量
    _requestBaseCount = () => {
        requestBaseCount().then(res => {
            let {status, msg, data} = res;
            if(status !==0) {
                message.error(msg);
                return false;
            }
            this.setState({
                count: data
            })
        })
    }
    render() {
        return (
            <div className='home'>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Link to='/user-index' className='color-box brown'>
                                <p className='count'>{this.state.count.userCount}</p>
                                <p className='desc'>
                                    <Icon className='fa' type="user" />
                                    <span>用户总数</span>
                                </p>
                            </Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Link to='/product-index' className='color-box green'>
                                <p className='count'>{this.state.count.productCount}</p>
                                <p className='desc'>
                                    <Icon className='fa' type="bars" />
                                    <span>商品总数</span>
                                </p>
                            </Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Link to='/order-index' className='color-box blue'>
                                <p className='count'>{this.state.count.orderCount}</p>
                                <p className='desc'>
                                    <Icon className='fa' type="schedule" />
                                    <span>订单总数</span>
                                </p>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Index