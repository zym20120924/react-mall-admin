import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {Table, message, Button} from 'antd'
import { requestCategoryList, addCategory, setCategoryName,  } from '../../../api/api.js'
import './category.less'

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
                        {
                            record.parentId === 0
                            // ? <a onClick={() => this.queryChildren(record['id'])}>查看子品类</a>
                            ? <Link to={`category-index/${record.id}`}>查看子品类</Link>
                            : null
                        }
                    </p>
                )
            }
        }];

        this.state = {
            dataList: [], //品类列表数据
            parentCategoryId: '',
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
            let categoryId = params.categoryId;
            if(categoryId !== 0) {
                this.setState({parentCategoryId:categoryId})
                this.props.history.push(`category-index/${categoryId}`);
            } else {
                this.setState({parentCategoryId:''})
            }
        }).catch(error => {
            console.log(error);
            this.setState({
                loading: false,
                dataList: [],
            })
        })
    }

    //跳转添加品类页面
    goAddCategory = () => {
        this.props.history.push('/add-category');
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
                    <p>父品类ID: {this.state.parentCategoryId}</p>
                    <Button type="primary" icon="plus" onClick={this.goAddCategory}>添加品类</Button>
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