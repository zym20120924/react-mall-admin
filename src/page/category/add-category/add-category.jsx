import React, {Component} from 'react'
import { Row, Col, Select, Input, Button, message } from 'antd'
import { requestCategoryList, requestAddCategory } from '../../../api/api.js'
import './add-category.less'
const Option = Select.Option

class addCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [], //品类列表数据
            categoryName: '', //品类名称
            parentId: '0', //根品类ID
        }
    }

    //加载品类
    loadCategoryList = () => {
        let params = {
            categoryId: 0
        }
        requestCategoryList(params).then(res => {
            let {status,msg,data} = res;
            if( 0 !== status) {
                message(msg);
                return
            }
            let categoryList = Array.from(data);
            this.setState({
                categoryList, //品类列表数据
            })
        }).catch(error => {
            console.log(error)
        })

    }

    //选择品类
    selectCategory = (val) => {
        let parentId = val
        this.setState({
            parentId
        })
    }

    //输入框值发生变化
    changeCategoryName = (e) => {
        let categoryName = e.target.value;
        this.setState({
            categoryName
        })
    }

    //提交
    onSubmit = () => {
        if(!this.state.categoryName) {
            //新增品类名称为空
            message.info('请输入品类名称');
            return
        }
        let params = {
            parentId: this.state.parentId,
            categoryName: this.state.categoryName,
        };
        requestAddCategory(params).then( res => {
            let {status,data} = res;
            if(status === 0) {
                message.success(data);
                this.props.history.push('/category-index');
            }
        })

    }

    componentDidMount() {
        this.loadCategoryList();
    }

    render () {
        return (
            <div className='add-category'>
                <Row>
                    <Col span={5}><p className='label'>所属品类</p></Col>
                    <Col span={10}>
                        <Select onChange={this.selectCategory} className='select' defaultValue='0'>
                            <Option value="0">根品类/</Option>
                            {
                                this.state.categoryList.map((category,index) => {
                                    return <Option value={category.id} key={index}>根品类/{category.name}</Option>
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}><p className='label'>品类名称</p></Col>
                    <Col span={10}><Input  onChange={this.changeCategoryName} placeholder="请输入品类名称" /></Col>
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

export default addCategory;