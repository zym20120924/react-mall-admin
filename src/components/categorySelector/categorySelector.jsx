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
            categoryId: this.state.firstCategoryId
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

    //选择一级分类
    onFirstCategoryChange = (val) => {
        if(this.props.readOnly){
            return;
        }
        let firstCategoryId = val || 0;

        this.setState({
            firstCategoryId,
            secondCategoryId: 0,
            secondCategoryList: []

        },() => {
            // 更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }

    // 选择二级品类
    onSecondCategoryChange = (val) =>{
        if(this.props.readOnly){
            return;
        }
        let secondCategoryId = val || 0;
        this.setState({
            secondCategoryId
        }, () => {
            this.onPropsCategoryChange();
        });
    }

    // 传给父组件选中的结果
    onPropsCategoryChange(){
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        // 如果是有二级品类
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        }
        // 如果只有一级品类
        else{
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }

    componentDidMount() {
        this.loadFirstCategory();
    }

    //在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps){
        let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
        // 数据没有发生变化的时候，直接不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId     : nextProps.categoryId,
                secondCategoryId    : 0
            });
        }
        // 有两级品类
        else{
            this.setState({
                firstCategoryId     : nextProps.parentCategoryId,
                secondCategoryId    : nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
            });
        }

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
                        <Select className='selector' defaultValue="" style={{ width: 120 }} onChange={this.onSecondCategoryChange}>
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

