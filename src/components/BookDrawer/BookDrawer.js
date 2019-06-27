import React, {Component} from "react";
import {Button, Col, Divider, Drawer, Form, Icon, Input, message, Radio, Row, Upload} from "antd";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    if (file.size / 1024 / 1024 >= 2) {
        message.error('Image must smaller than 2MB!');
        return false;
    }
    return true;
}

export default class BookDrawer extends Component{
    componentDidMount(){
        this.props.onRef(this);
        this.setState({
            target: this.props.target
        })
    }

    state = {
        visible : false,
        target : null
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from Response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };


    showDrawer = (record = null) => {
        if (record !== null) {
            this.setState({
                target: record
            })
        }
        this.setState({
            visible: true
        });
    };

    hideDrawer = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div>Upload</div>
            </div>
        );
        return (
            <Drawer
                title="发布书籍信息"
                placement="left"
                width={300}
                closable={true}
                onClose={this.hideDrawer}
                visible={this.state.visible}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="书名">
                        <Input placeholder="请输入书名" disabled={!!this.state.target} value={this.state.target ? this.state.target.name : ""}/>
                    </Form.Item>
                    <Form.Item label="ISBN">
                        <Input placeholder="请输入ISBN"/>
                    </Form.Item>
                    <Row gutter={16}><Col span={12}>
                        <Form.Item label="原价">
                            <Input placeholder="请输入原价"/>
                        </Form.Item>
                    </Col><Col span={12}>
                        <Form.Item label="报价">
                            <Input placeholder="请输入售价" disabled={!!this.state.target} value={this.state.target ? this.state.target.price : ""}/>
                        </Form.Item>
                    </Col></Row>
                    <Form.Item label="类别">
                        <Input placeholder="请输入类别信息" disabled={!!this.state.target} value={this.state.target ? this.state.target.tags : ""}/>
                    </Form.Item>
                    <Form.Item label="内容介绍">
                        <Input.TextArea rows={4} placeholder="请输入书籍内容简介"/>
                    </Form.Item>
                    <Form.Item label="递送方式">
                        <Radio.Group>
                            <Radio value={0}>线下交易</Radio>
                            <Radio value={1}>快递寄送</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Upload name={'file'}>
                        <Button>
                            <Icon type="upload"/> 上传图书照片
                        </Button>
                    </Upload>
                    <Divider/>
                    <Button.Group>
                        <Button onClick={this.hideDrawer}>关闭</Button>
                        <Button type={"primary"} onClick={void (0)}>提交</Button>
                    </Button.Group>
                </Form>
            </Drawer>
        );
    }
}