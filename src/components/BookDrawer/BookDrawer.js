import React, {Component} from "react";
import {Button, Col, Divider, Drawer, Form, Icon, Input, message, Radio, Row, Upload, Typography} from "antd";
import {Post} from "../../helper/Api";

const {Text} = Typography;

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

const BookForm = Form.create({name: 'book_form'})(
    class extends React.Component {
        state = {
            loading: false,
            imageUrl: "",
            tipInfo: false,
            target: null
        };

        componentDidMount(): void {
            if (this.props.target != null) {
                this.props.form.setFieldsValue({
                    "name": this.props.target.name,
                    "current": this.props.target.price
                });
                this.setState({
                    target: this.props.target
                })
            }
        }


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
                    }), console.log(this.state.imageUrl)
                );
            }
        };

        handleCommit = () => {
            const {form} = this.props;
            form.validateFields((err, values) => {
                this.setState({
                    tipInfo : true
                });
                if (err) {
                    return;
                }
                Post('/book', values).then(data => {
                    this.setState({visible: false});
                    message.success("注册成功");
                    form.resetFields();
                }).catch(msg => {
                    message.error(msg);
                });
            });
        };

        render() {
            const {getFieldDecorator, getFieldValue} = this.props.form;
            return (<Form layout="vertical" hideRequiredMark>
                <Form.Item label="书名">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入书名！'}],
                    })(<Input disabled={!!this.state.target}/>)}
                </Form.Item>
                <Form.Item label="ISBN">
                    {getFieldDecorator('ISBN', {
                        rules: [{required: true, pattern: /^(\d{10}|\d{13})$/, message: '请输入10或13位的ISBN号！'}],
                    })(<Input />)}
                </Form.Item>
                <Row gutter={16}><Col span={12}>
                    <Form.Item label="原价">
                        {getFieldDecorator('original', {
                            rules: [{required: true, pattern: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/, message: '请输入正确格式的原价！'}],
                        })(<Input />)}
                    </Form.Item>
                </Col><Col span={12}>
                    <Form.Item label="报价">
                        {getFieldDecorator('current', {
                            rules: [{required: true, pattern: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/, message: '请输入正确格式的售价！'}],
                        })(<Input disabled={!!this.state.target}/>)}
                    </Form.Item>
                </Col></Row>
                <Form.Item label="类别">
                    {getFieldDecorator('tags', {
                        rules: [{required: true, message: '请输入类别信息！'}],
                    })(<Input disabled={!!this.state.target}/>)}
                </Form.Item>
                <Form.Item label="内容介绍">
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: '请输入书籍内容简介！'}],
                    })(<Input.TextArea rows={4}/>)}
                </Form.Item>
                <Form.Item label="递送方式">
                    {getFieldDecorator('deliver', {
                        rules: [{required: true, message: '请选择递送方式！'}],
                    })(<Radio.Group>
                        <Radio value={"offline"}>线下交易</Radio>
                        <Radio value={"express"}>快递寄送</Radio>
                    </Radio.Group>)}
                </Form.Item>
                <Upload name={'file'} beforeUpload={beforeUpload} onChange={this.handleChange}>
                    <Button>
                        <Icon type="upload"/> 上传图书照片
                    </Button>
                </Upload>
                {!!this.state.imageUrl || !this.state.tipInfo ? "" : <Text type="danger">请上传书籍图片!</Text>}
                <Divider/>
                <Button.Group>
                    <Button onClick={this.props.hideDrawer}>关闭</Button>
                    <Button type={"primary"} onClick={this.handleCommit} disabled={!this.state.loading}>提交</Button>
                </Button.Group>
            </Form>);
        }
    }
);

export default class BookDrawer extends Component {
    componentDidMount() {
        this.props.onRef(this);
        this.setState(this.dataBeforeMounted);
    }

    state = {
        visible: false,
        target: null
    };

    dataBeforeMounted = {};

    showDrawer = (record = null) => {
        if (record !== null) {
            this.dataBeforeMounted.target = record;
        }
        this.dataBeforeMounted.visible = true;
    };

    hideDrawer = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <Drawer
                title="发布书籍信息"
                placement="left"
                width={300}
                closable={true}
                onClose={this.hideDrawer}
                visible={this.state.visible}
            >
                <BookForm target={this.state.target} hideDrawer={this.hideDrawer}/>
            </Drawer>
        );
    }
}