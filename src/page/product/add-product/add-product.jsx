import React, {Component} from 'react'
import { Row, Col, Input, Select, Button } from 'antd';
import RichEditor from '../../../components/rich-editor/rich-editor'
import './add-product.less'

const Option = Select.Option;

class AddProduct extends Component {

    //分类选择
    selectChange = (val) => {
        console.log(val);
    }
    //改变商品价格
    onPrice = (val) => {
        console.log(val)
    }

    render() {
        return (
            <div className="add-product">
                <Row>
                    <Col span={5}><p className='label'>商品名称</p></Col>
                    <Col span={10}><Input placeholder="请输入商品名称" /></Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品描述</p></Col>
                    <Col span={10}><Input placeholder="请输入商品描述" /></Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>所属分类</p></Col>
                    <Col span={10}>
                        <Select defaultValue="lucy" className='select' onChange={this.selectChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled">Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品价格</p></Col>
                    <Col span={10}>
                        <Input placeholder="价格" addonAfter="元" />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品库存</p></Col>
                    <Col span={10}>
                        <Input placeholder="库存" addonAfter="件" />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品图片</p></Col>
                    <Col span={10}><Input placeholder="请输入商品描述" /></Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品详情</p></Col>
                    <Col span={18}>
                        <RichEditor></RichEditor>
                    </Col>
                </Row>
                <Row>
                    <Col offset={5} span={10}>
                        <Button type="primary">提交</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default AddProduct