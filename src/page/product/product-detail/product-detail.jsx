import React, {Component} from 'react'
import { Row, Col, Input, message } from 'antd';
import CategorySelector from '../../../components/categorySelector/categorySelector'
import { queryProductDetail } from '../../../api/api.js'
import './product-detail.less'

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailData: {},
        }
    }

    //加载商品详情
    loadProductDetail = () => {
        let params = {
            productId: this.props.location.state.productId
        }
        queryProductDetail(params).then(res => {
            let {status,msg,data} = res;
            if(0 !== status) {
                message.error(msg);
                return;
            }
            let subImages = data['subImages'].split(',');
            data['subImages'] = subImages.map((imgUrl) => `${data['imageHost']}${imgUrl}`)
            this.setState({
                detailData: data
            })

            console.log(this.state.detailData);
        })
    }

    componentDidMount() {
        this.loadProductDetail();
    }

    render() {
        return (
            <div className="product-detail">
                <Row>
                    <Col span={5}><p className='label'>商品名称</p></Col>
                    <Col span={10}><p className='explain'>{this.state.detailData.name}</p></Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品描述</p></Col>
                    <Col span={10}><p className='explain'>{this.state.detailData.subtitle}</p></Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>所属分类</p></Col>
                    <Col span={10}>
                        <CategorySelector></CategorySelector>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品价格</p></Col>
                    <Col span={10}>
                        <Input placeholder="价格" value={this.state.detailData['price']} disabled={true} addonAfter="元" />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品库存</p></Col>
                    <Col span={10}>
                        <Input placeholder="库存" value={this.state.detailData['stock']} disabled={true} addonAfter="件" />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品图片</p></Col>
                    <Col span={10}>
                        {

                            this.state.detailData.subImages&&this.state.detailData.subImages.length ? this.state.detailData.subImages.map(
                                (image,index) => (
                                    <div className='img-box' key={index}>
                                        <img className='img' src={image} alt="图片"/>
                                    </div>
                                )
                            ) : (<div>暂无图片</div>)
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品详情</p></Col>
                    <Col span={10}>
                        <div dangerouslySetInnerHTML={{__html: this.state.detailData['detail']}}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProductDetail