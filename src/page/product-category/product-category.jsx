import React,{Component} from 'react'
import {Table, Input, InputNumber, Popconfirm, Form,message,Button} from 'antd'
import { requestCategoryList, addCategory, setCategoryName,  } from '../../api/api.js'
import './product-category.less'

class ProductCategory extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '品类ID',
            dataIndex: 'id',
        }, {
            title: '品类名称',
            dataIndex: 'name',
        }, {
            title: '操作',
            render: (text, record) => {
                return (
                    <p className='operating'>
                        <a>修改名称</a>
                        <a onClick={() => this.queryChildren(record['id'])}>查看子品类</a>
                    </p>

                )
            }
        }];

        this.state = {
            dataList: [],
            loading: false,
        }
    }

    queryChildren = (id) => {
        let params = {
            categoryId: id,
        }
        this.fetch(params)
    }

    fetch = (params ={}) => {
        this.setState({loading:true});
        requestCategoryList(params).then(res => {
            let {status,msg,data} = res;
            if (status !== 0) {
                message.error(msg);
                this.setState({loading:false});
                return
            }
            this.setState({
                loading: false,
                dataList: data,
            })
        })
    }

    componentDidMount() {
        let params = {
            categoryId: 0
        }
        this.fetch(params);
    }

    render() {
        return (
            <article className='product-category'>
                <div className="top">
                    <p>父品类ID: </p>
                    <Button type="primary" icon="plus">添加品类</Button>
                </div>
                <Table
                    columns={this.columns} rowKey='id'
                    dataSource={this.state.dataList}
                    pagination={false}
                    loading={this.state.loading}
                />
            </article>
        )
    }
}

export default ProductCategory;