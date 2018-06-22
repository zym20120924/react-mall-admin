import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Row, Col } from 'antd';
import './home.less'

class Index extends Component {
    render() {
        return (
            <div className='home'>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Link to='/user-index' className='color-box brown'>
                                <p className='count'></p>
                                <p className='desc'>
                                    <i></i>
                                    <span>用户总数</span>
                                </p>
                            </Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Link to='/product-index' className='color-box brown'>
                                <p className='count'></p>
                                <p className='desc'>
                                    <i></i>
                                    <span>商品总数</span>
                                </p>
                            </Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Link to='/order-index' className='color-box brown'>
                                <p className='count'></p>
                                <p className='desc'>
                                    <i></i>
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