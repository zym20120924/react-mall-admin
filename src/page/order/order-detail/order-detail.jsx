import React, {Component} from 'react'
import { Row, Col, Table, message } from 'antd';
import { requestOrderDetail } from '../../../api/api.js'
import './order-detail.less'

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '商铺图片',
            dataIndex: 'productImage',
            render: (text) => {
                return (
                    <img src={text} alt="商品图片"/>
                )
            }
        }, {
            title: '商品信息',
            dataIndex: 'productName',
        }, {
            title: '单价',
            dataIndex: 'currentUnitPrice',
        }, {
            title: '数量',
            dataIndex: 'quantity',
        }, {
            title: '合计',
            dataIndex: 'totalPrice',
        }];
        this.state = {
            orderInfo:{},
            productList:[],
        }
    }

    //查询订单详情
    _requestOrderDetail= () => {
        let params =  {
            orderNo: this.props.location.state.orderNo
        }
        requestOrderDetail(params).then(res => {
            let {status,msg,data} = res;
            if(status !== 0) {
                message.error(msg);
                return;
            }
            let productList = Array.from(data.orderItemVoList).map((item) => {
                item['productImage'] = `${data['imageHost']}${item.productImage}`
                return item;
            });

            this.setState({
                orderInfo: data,
                productList: productList
            })
        })
    }

    componentDidMount() {
        this._requestOrderDetail();
    }

    render() {
        let receiverInfo = this.state.orderInfo.shippingVo || {};

        return (
            <article className="order-tetail">
                <Row>
                    <Col className='title' span={6}>订单号</Col>
                    <Col className='info' span={18}>{this.state.orderInfo.orderNo}</Col>
                </Row>
                <Row>
                    <Col className='title' span={6}>创建时间</Col>
                    <Col className='info' span={18}>{this.state.orderInfo.createTime}</Col>
                </Row>
                <Row>
                    <Col className='title' span={6}>收件人</Col>
                    <Col className='info' span={18}>
                        {receiverInfo.receiverName}，
                        {receiverInfo.receiverProvince}
                        {receiverInfo.receiverCity}
                        {receiverInfo.receiverAddress}
                        {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                    </Col>
                </Row>
                <Row>
                    <Col className='title' span={6}>订单状态</Col>
                    <Col className='info' span={18}>
                        {this.state.orderInfo.statusDesc}
                    </Col>
                </Row>
                <Row>
                    <Col className='title' span={6}>支付方式</Col>
                    <Col className='info' span={18}>{this.state.orderInfo.paymentTypeDesc}</Col>
                </Row>
                <Row>
                    <Col className='title' span={6}>订单金额</Col>
                    <Col className='info' span={18}>￥{this.state.orderInfo.payment}</Col>
                </Row>
                <Row>
                    <Col className='title' span={6}>商品列表</Col>
                    <Col className='info' span={18}>
                        <Table
                            columns={this.columns} rowKey='productId'
                            dataSource={this.state.productList}
                            pagination={false}
                        />
                    </Col>
                </Row>
            </article>
        )
    }
}

export default OrderDetail