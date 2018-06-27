import React,{Component} from 'react'
import {Table, message, Button,Input,InputNumber,Popconfirm,Form} from 'antd'
import { requestCategoryList, setCategoryName,  } from '../../../api/api.js'
import './category.less'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };
    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class ProductCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [], //品类列表数据
            parentCategoryId: 0,
            loading: false,
            editingKey: ''
        };
        this.columns = [
            {
                title: '品类ID',
                dataIndex: 'id',
            },
            {
                title: '品类名称',
                dataIndex: 'name',
                editable: true,
            },
            {
                title: '操作',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <p className='operating'>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a onClick={() => this.save(form, record.id)} style={{ marginRight: 8 }}>保存</a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm title="是否取消修改?" okText='确认' cancelText='取消' onConfirm={() => this.cancel(record.id)}>
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>) : (
                                <a onClick={() => this.edit(record.id)}>修改名称</a>
                            )}
                            {
                            record.parentId === 0
                                ? <a onClick={() => this.queryChildren(record['id'])}>查看子品类</a>
                                : null
                            }
                        </p>
                    );
                },
            },
        ];
    }

    //跳转添加品类页面
    goAddCategory = () => {
        this.props.history.push('/add-category');
    }
    //查看子类
    queryChildren = (id) => {
        this.props.history.push(`/category-index/${id}`);
    }

    //加载品类列表
    loadCategoryList = () => {
        this.setState({loading:true});
        let params = {
            categoryId:this.state.parentCategoryId
        }
        requestCategoryList(params).then(res => {
            let {status,msg,data} = res;
            if (status !== 0) {
                message.error(msg);
                this.setState({loading:false});
                return
            }
            let dataList = Array.from(data)
            this.setState({
                loading: false,
                dataList
            })
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

    isEditing = (record) => {
        return record.id === this.state.editingKey;
    };
    edit(key) {
        this.setState({ editingKey: key });
    }
    save(form, key) {
        let categoryName = ''
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            categoryName = row.name;
        });
        let params = {
            categoryId: key,
            categoryName
        }
        setCategoryName(params).then(res => {
            let {status,data} = res;
                if(status === 0) {
                    message.success(data);
                    this.setState({
                        editingKey: ''
                    })
                    this.loadCategoryList();
                }
        })
    }
    //取消编辑
    cancel = () => {
        this.setState({ editingKey: '' });
    };

    componentDidMount() {
        this.loadCategoryList();
    }

    //在组件完成更新后立即调用
    componentDidUpdate(prevProps,prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId : newId
            },() => {
                this.loadCategoryList();
            })
        }
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (

            <article className='product-category'>
                <div className="top">
                    <p>父品类ID: {this.state.parentCategoryId}</p>
                    <Button type="primary" icon="plus" onClick={this.goAddCategory}>添加品类</Button>
                </div>
                <Table
                    components={components}
                    bordered
                    loading={this.state.loading}
                    dataSource={this.state.dataList}
                    columns={columns} rowKey='id'
                />
            </article>
        );
    }
}





export default ProductCategory;