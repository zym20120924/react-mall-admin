import React, {Component} from 'react'
import { Row, Col, Input, Select, Button, message, Upload, Icon } from 'antd';
import RichEditor from '../../../components/rich-editor/rich-editor'
import { requestCategoryList,addProduct } from '../../../api/api.js'
import './add-product.less'

const Option = Select.Option;

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryList: [], //品类列表数据
            name: '', //商品名称
            subtitle: '', //商品描述
            categoryId: 0, //品类id
            subImages: [], //上传图片数组
            price: '', //商品价格
            stock: '', //库存
            detail: '', //商品详情
            status: 1 //商品状态 初始为1为在售
        }
    }

    loadCategoryList = () => {
        let params = {
            categoryId: 0
        }
        requestCategoryList(params).then( res => {
            let {status,msg,data} = res;
            if(status !== 0) {
                message(msg);
                return
            }
            let categoryList = Array.from(data);
            this.setState({
                categoryList
            })
        })
    }

    //分类选择
    selectChange = (val) => {
        this.setState({
            categoryId: val
        })
    }
    //改变商品名称
    onName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    //改变商品描述
    onDescription = (e) => {
        this.setState({
            subtitle: e.target.value
        })
    }
    //改变商品价格
    onPrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }
    //改变商品件数
    onPieces = (e) => {
        this.setState({
            stock: e.target.value
        })
    }
    //上传图片
    uploadImg = (obj) => {
        let {file} = obj;
        if(file.status === 'done') {
            let {status,data} = file.response;
            if(status ===0) {
                let subImages = this.state.subImages.push(data.url);
                this.setState({
                    subImages
                })
            }
        }
    }
    //上传图片数据格式化
    getSubImagesString = () => {
        return this.state.subImages.map((image) => image.uri).join(',');
    }
    //商品详情改变
    detailChange = (detail) => {
        this.setState({detail})
    }
    //提交
    onSubmit = () => {

        let params = {
            name        : this.state.name, //商品名称
            subtitle    : this.state.subtitle, //商品描述
            categoryId  : parseInt(this.state.categoryId,10), //品类id
            subImages   : this.getSubImagesString(), //上传图片数组
            detail      : this.state.detail, //商品详情
            price       : parseFloat(this.state.price), //商品价格
            stock       : parseInt(this.state.stock,10), //商品库存
            status      : this.state.status, //商品状态 初始为1为在售
        }
        // 判断用户名为空
        if(typeof params.name !== 'string' || params.name.length ===0){
            message.info('商品名称不能为空！');
            return;
        }
        // 判断描述不能为空
        if(typeof params.subtitle !== 'string' || params.subtitle.length ===0){
            message.info('商品描述不能为空！');
            return;
        }
        // 验证品类ID
        if(typeof params.categoryId !== 'number' || !(params.categoryId > 0)){
            message.info('请选择商品品类！');
            return;
        }
        // 判断商品价格为数字，且大于0
        if(typeof params.price !== 'number' || !(params.price >= 0)){
            message.info('请输入正确的商品价格');
            return;
        }
        // 判断库存为数字，且大于或等于0
        if(typeof params.stock !== 'number' || !(params.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        // 判断图片是否上传
        if(typeof params.subImages !== 'string' || !params.subImages){
            return {
                status: false,
                msg: '请上传图片！'
            }
        }
        // 判断商品详情不能为空
        if(!params.detail){
            return {
                status: false,
                msg: '商品详情不能为空！'
            }
        }
        addProduct(params).then(res => {
            let {status,data} = res;
            if(status === 0) {
                message.success(data);
                this.props.history.push('/product-index');
            }
        })
    }


    componentDidMount() {
        this.loadCategoryList()
    }

    render() {
        const fileList = [];
        const uploadImg = {
            action: '/manage/product/upload.do', //图片上传地址
            name: 'upload_file', //发到后台的文件参数名
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
        };

        return (
            <div className="add-product">
                <Row>
                    <Col span={5}><p className='label'>商品名称</p></Col>
                    <Col span={10}><Input placeholder="请输入商品名称" onChange={this.onName} /></Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品描述</p></Col>
                    <Col span={10}><Input placeholder="请输入商品描述" onChange={this.onDescription} /></Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>所属分类</p></Col>
                    <Col span={10}>
                        <Select defaultValue="" className='select' onChange={this.selectChange}>
                            <Option value="">请选择一级分类</Option>
                            {
                                this.state.categoryList.length ? this.state.categoryList.map((category,index) => {
                                    return <Option value={category.id} key={index}>{category.name}</Option>
                                }): null
                            }
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品价格</p></Col>
                    <Col span={10}>
                        <Input placeholder="价格" addonAfter="元" onChange={this.onPrice} />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品库存</p></Col>
                    <Col span={10}>
                        <Input placeholder="库存" addonAfter="件" onChange={this.onPieces} />
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品图片</p></Col>
                    <Col span={10}>
                        <Upload {...uploadImg} onChange={this.uploadImg}>
                            <Button><Icon type="upload" /> 上传图片</Button>
                        </Upload>

                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>商品详情</p></Col>
                    <Col span={18}>
                        <RichEditor detailContent={this.state.detail} onChange={this.detailChange}></RichEditor>
                    </Col>
                </Row>
                <Row>
                    <Col offset={5} span={10}>
                        <Button type="primary" onClick={this.onSubmit}>提交</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default AddProduct