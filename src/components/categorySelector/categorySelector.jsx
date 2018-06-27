/*
 * 分类选择器组件
 */
import React,{Component} from 'react'
import { Select, message } from 'antd'
import { requestCategoryList } from '../../api/api.js'
import './categorySelector.less'

const Option = Select.Option;

class CategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [], //一级分类列表数据
            firstCategoryId: 0,
            secondCategoryList: [], //二级分类列表数据
            secondCategoryId: 0,
        }
    }

    //加载一级分类
    loadFirstCategory() {
        let params = {
            categoryId: 0
        }
        requestCategoryList(params).then(res => {
            let {status,msg,data} = res;
            if(status !==0) {
                message.error(msg);
                return;
            }
            let firstCategoryList = Array.from(data);
            this.setState({
                firstCategoryList
            })
        })
    }

    //加载二级分类
    loadSecondCategory() {
        let params = {
            categoryId: this.state.loadFirstCategory()
        }
        requestCategoryList(params).then(res => {
            let {status,msg,data} = res;
            if(status !==0) {
                message.error(msg);
                return
            }
            let secondCategoryId = Array.from(data);
            this.setState({
                secondCategoryId
            })
        })
    }

    //一级分类选择
    onFirstCategoryChange = (val) => {
        console.log(val)
    }

    componentDidMount() {
        this.loadFirstCategory();
    }

    //在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
    }

    render() {
        return (
            <div className="category-selector">
                <Select className='selector' defaultValue="" style={{ width: 120 }} onChange={this.onFirstCategoryChange}>
                    <Option value="">选择一级分类</Option>
                    {
                        this.state.firstCategoryList.map((category,index) => {
                            return <Option value={category.id} key={index}>{category.name}</Option>
                        })
                    }
                </Select>
                {
                    this.state.secondCategoryList.length ?
                        <Select className='selector' defaultValue="" style={{ width: 120 }} onChange={this.onFirstCategoryChange}>
                            <Option value="">选择二级分类</Option>
                            {
                                this.state.secondCategoryList.map((category,index) => {
                                    return <Option value={category.id} key={index}>{category.name}</Option>
                                })
                            }
                        </Select> :null
                }
            </div>
        )
    }
}

export default CategorySelector

