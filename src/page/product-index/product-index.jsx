import React,{Component} from 'react'
import { Table, Select, Button, message } from 'antd';
import { requestProductList } from '../../api/api.js'
import './product-index.less'
const Option = Select.Option;

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
        }, {
            title: '操作',
            render: (text, record) => {
                return (
                    <p className='operating'>
                        <a>详情</a>
                        <a>编辑</a>
                    </p>

                )
            }
        }];

        this.state = {
            dataList: [],
            pagination: {},
            loading: false,
        }
    }

    fetch = (params = {}) => {
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

    searchChange = () => {

    }
    //搜索
    onSearch = () => {

    }
    //分页
    handleTableChange = () => {

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
                    <Button type="primary" icon="plus">添加商品</Button>
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