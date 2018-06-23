import React,{Component} from 'react'
import { Table, Select, Button, message } from 'antd';
import { requestOrderList, queryOrderList } from '../../../api/api'
import './order-index.less'
const Option = Select.Option;

class OrderIndex extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '订单号',
            dataIndex: 'orderNo',
        }, {
            title: '收件人',
            dataIndex: 'receiverName',
        }, {
            title: '订单状态',
            dataIndex: 'statusDesc',
        }, {
            title: '订单总价',
            dataIndex: 'payment',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
        },{
            title: '操作',
            dataIndex: 'orderItemVoList',
            render: (text, record) => {
                return (
                    <a style={{color:'#337ab7'}} onClick={() => this.goOrderDetail(record['orderItemVoList'][0]['orderNo'])}>详情</a>
                )
            }
        }];

        this.state = {
            search:'', //搜索
            orderList: [],//订单列表
            pagination: {}, //分页数据
            loading: false,
        }

    }

    //获取订单列表
    fetch = (params = {}) => {
        this.setState({loading:true});
        requestOrderList(params).then(res => {
            let { status, msg, data} = res;
            if(status !==0) {
                message.error(msg);
                return;
            }
            const pagination = { ...this.state.pagination };
            pagination.total = data.total; //总共多少条数据
            let orderList = Array.from(data.list);
            this.setState({
                orderList: orderList,
                loading: false,
                pagination
            })

        })
    }
    searchChange = (value) => {
        this.setState({
            search: value,
        })
    }
    //按订单号查询
    onSearch = () => {
        if(!this.state.search) {
            this.fetch();
            return;
        }
        let params = {
            orderNo: this.state.search
        }
        this.setState({loading: true})
        queryOrderList(params).then(res => {
            let {status,msg,data} = res;
            if(status !== 0 ) {
                message.error(msg);
                this.setState({
                    orderList:[],
                    loading:false,
                })
                return;
            }
            const pagination = { ...this.state.pagination };
            pagination.total = data.total; //总共多少条数据
            let orderList = Array.from(data.list);
            this.setState({
                orderList: orderList,
                loading: false,
                pagination
            })
        })
    }
    //跳转订单详情页面
    goOrderDetail = (params ='') => {
        this.props.history.push({
            pathname: '/order-detail',
            state: {
                orderNo: params //传入订单号
            },
        });
    }
    //分页
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        //改变当前页
        this.setState({
            pagination: pager,
        })
        this.fetch({
            pageSize: pagination.pageSize, //一次显示10条数据
            pageNum: pagination.current, //当前页数
        })
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <div className='order-index'>
                <div className='top'>
                    <Select
                        className='select-mr select'
                        showSearch
                        defaultValue="按订单号查询"
                        style={{ width: 200 }}
                        placeholder="按订单号查询"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="id">按订单号查询</Option>
                    </Select>
                    <Select
                        className='select-mr'
                        mode="combobox"
                        style={{ width: 200 }}
                        onChange={this.searchChange}
                        filterOption={false}
                        placeholder="订单号"
                    >
                    </Select>
                    <Button type='primary' icon="search" onClick={this.onSearch}>搜索</Button>
                </div>

                <Table
                    columns={this.columns} rowKey='orderNo'
                    dataSource={this.state.orderList}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default OrderIndex;