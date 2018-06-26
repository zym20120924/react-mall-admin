/*
 * 分类选择器组件
 */
import React,{Component} from 'react'
import { Select } from 'antd'
import './categorySelector.less'

const Option = Select.Option;

class CategorySelector extends Component {
    constructor(props) {
        super(props);
    }

    onFirstCategoryChange = (val) => {
        console.log(val)
    }

    render() {
        return (
            <div className="category-selector">
                <Select className='selector' defaultValue="" style={{ width: 120 }} onChange={this.onFirstCategoryChange}>
                    <Option value="">选择一级分类</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select className='selector' defaultValue="" style={{ width: 120 }} onChange={this.onFirstCategoryChange}>
                    <Option value="">选择二级分类</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
        )
    }
}

export default CategorySelector

