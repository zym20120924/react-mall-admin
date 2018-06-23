import React,{Component} from 'react'
import { Table, message } from 'antd';
import { requestUserList } from '../../api/api'

const columns = [{
    title: 'Id',
    dataIndex: 'id',
}, {
    title: '用户名',
    dataIndex: 'username',
}, {
    title: '邮箱',
    dataIndex: 'email',
}, {
    title: '电话',
    dataIndex: 'phone',
}, {
    title: '注册时间',
    dataIndex: 'updateTime',
}];

class UserIndex extends Component {
    state = {
        data: [], //用户列表数据
        pagination: {}, //分页
        loading: false //loading状态
    }

    //请求表格数据
    fetch = (params ={}) => {
        this.setState({ loading:true })
        requestUserList(params).then(res => {
            let {status,msg,data} = res;
            if(status !== 0) {
                message.error(msg);
                this.setState({
                    loading:false,
                })
                return;
            }
            let listData = Array.from(data.list).map((item,index) => {
                item['key'] = index
                return item;
            })
            const pagination = { ...this.state.pagination };
            pagination.total = data.total; //总共多少条数据
            this.setState({
                data: listData,
                loading:false,
                pagination
            })
        })
    }

    //处理表单变化
    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        //改变当前页
        this.setState({
            pagination: pager,
        });
        this.fetch({
            pageSize: pagination.pageSize, //一次显示10条数据
            pageNum: pagination.current, //当前页数
        })
    }

    componentDidMount() {
        this.fetch()
    }

    render() {
        return (
            <Table
                columns={columns} rowKey='id'
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        )
    }
}

export default UserIndex;