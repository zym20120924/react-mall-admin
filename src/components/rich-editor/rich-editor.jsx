/*
 * 富文本编辑器
 */
import React, {Component} from 'react'
import LzEditor from 'react-lz-editor'

class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseList: [],
            content: this.props.detailContent,
        }
    }
    //富文本编辑框改变
    receiveHtml = (content) => {
        this.props.onChange(content) //回调函数传递参数给父组件
    }
    render() {
        const uploadProps = {
            action: "http://v0.api.upyun.com/devopee",
            onChange: this.onChange,
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => {

            },
            multiple: true,
            beforeUpload: this.beforeUpload,
            showUploadList: true
        }
        return (
            <div>
                <LzEditor active={true} cbReceiver={this.receiveHtml} uploadProps={uploadProps} />
            </div>
        );
    }
}

export default RichEditor