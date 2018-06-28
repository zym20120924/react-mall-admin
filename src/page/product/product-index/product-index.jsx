import React,{Component} from 'react'
import { Table, Select, Button, message, Modal } from 'antd';
import { requestProductList, searchProductList,setSaleStatus } from '../../../api/api.js'
import './product-index.less'
const Option = Select.Option;
const confirm = Modal.confirm;

class ProductIndex extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '商品ID',
            dataIndex: 'id',
        }, {
            title: '商品信息',
            dataIndex: 'name',
        }, {
            title: '价格',
            dataIndex: 'price',
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                return (
                    <div className='status-box'>
                        <p className='status-info'>{text === 1 ? '在售' : '已下架'}</p>
                        <Button onClick={() => {this.onSetProductStatus(record.id,text)}}>{text === 1 ? '下架' : '上架'}</Button>
                    </div>
                )
            }
        }, {
            title: '操作',
            render: (text, record) => {
                return (
                    <p className='operating'>
                        <a onClick={() => {this.goProductDetail(record.id)}}>详情</a>
                        <a onClick={() => {this.goProductEdit(record.id)}}>编辑</a>
                    </p>

                )
            }
        }];

        this.state = {
            dataList: [],
            pagination: {},
            loading: false,
            type: 'id', //搜索类型 默认按照id查询
            search:'', //搜索值
        }
    }
    //查询商品列表
    fetch = (params = {pageNum: 1, pageSize: 10 }) => {
        this.setState({ loading: true });
        requestProductList(params).then( res => {
            let {status,msg,data} = res;
            if(status !== 0) {
                message.error(msg);
                this.setState({ loading: true });
                return;
            }
            let dataList = Array.from(data.list),
                pagination = {...this.state.pagination};
            pagination.total = data.total;
            this.setState({
                loading: false,
                dataList,
                pagination
            })
        })
    }
    //选择搜索类型
    selectType = (val) => {
        console.log(val);
        this.setState({
            type: val
        })
    }
    //监听搜索值
    searchChange = (val) => {
        this.setState({
            search: val,
        })
    }

    //搜索
    onSearch = () => {
        let params = {
            pageNum: 1,
            pageSize: 10,
        }
        if(this.state.type === 'id') {
            params['productId'] = this.state.search
        } else {
            params['productName'] = this.state.search
        }
        if(this.state.search) {
            this._searchProductList(params);
        } else {
            this.fetch({
                pageNum: 1,
                pageSize: 10,
            });
        }
    }
    //搜索
    _searchProductList = (params = {}) => {
        searchProductList(params).then( res => {
            let {status,msg,data} = res;
            if(status !== 0 ) {
                message.error(msg);
                this.setState({
                    dataList:[],
                    loading:false,
                })
                return;
            }
            const pagination = { ...this.state.pagination };
            pagination.total = data.total; //总共多少条数据
            let dataList = Array.from(data.list);
            this.setState({
                dataList,
                loading: false,
                pagination
            })
        })
    }
    //上下架
    onSetProductStatus = (id,status) => {
        let newStatus = status === 1 ? 2 : 1,
            confrimTips = status === 1 ? '确定要下架该商品？' : '确定要上架该商品？';
        let _this = this;
        confirm({
            title: confrimTips,
            cancelText:'取消',
            okText: '确认',
            onOk() {
                console.log('OK');
                let params = {
                    productId: id,
                    status: newStatus,
                }
                setSaleStatus(params).then( res => {
                    let {status,data } = res;
                    if(status === 0) {
                        message.success(data);
                        _this.fetch();
                    }
                })
            },
        });
    }
    //分页
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        })
        if(this.state.search) {
            let params = {
                pageNum: pagination.current,
            }
            if(this.state.type === 'id') {
                params['productId'] = this.state.search
            } else {
                params['productName'] = this.state.search
            }
            this._searchProductList(params);
        } else {
            this.fetch({
                pageSize: pagination.pageSize, //一次显示10条数据
                pageNum: pagination.current, //当前页数
            })
        }
    }
    //跳转添加商品页
    goAddProduct = () => {
        this.props.history.push({
            pathname: '/add-product'
        })
    }
    //跳转商品详情页
    goProductDetail = (id) => {
        this.props.history.push({
            pathname: '/product-detail',
            state: {
                productId: id,
            }
        })
    }
    //跳转编辑商品
    goProductEdit = (id) => {
        this.props.history.push({
            pathname: '/add-product',
            state: {
                productId: id,
            }
        })
    }

    componentDidMount () {
        this.fetch();
    }

    render() {
        return (
            <div className='product-index'>
                <div className="top">
                    <div>
                        <Select
                            className='select-mr select'
                            showSearch
                            defaultValue="按商品ID查询"
                            style={{ width: 200 }}
                            placeholder="按商品ID查询"
                            optionFilterProp="children"
                            onChange={this.selectType}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="id">按商品ID查询</Option>
                            <Option value="name">按商品名称查询</Option>
                        </Select>
                        <Select
                            className='select-mr'
                            mode="combobox"
                            style={{ width: 200 }}
                            onChange={this.searchChange}
                            filterOption={false}
                            placeholder="关键词"
                        >
                        </Select>
                        <Button type='primary' icon="search" onClick={this.onSearch}>搜索</Button>
                    </div>
                    <Button type="primary" icon="plus" onClick={this.goAddProduct}>添加商品</Button>
                </div>
                <Table
                    columns={this.columns} rowKey='id'
                    dataSource={this.state.dataList}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default ProductIndex;