import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, Card, message, Typography, Radio, Modal, Row, Col} from 'antd';
import {withRouter} from 'react-router-dom';
import './login.css'
import logo from "../../logo.png";
import {ApiRoot} from '../../helper/constant'
import axios from 'axios';
import qs from 'qs';

const {Title} = Typography;

const LoginCardTitle = (
    <div><Row gutter={12}><Col span={12}>
        <img src={logo} alt="logo" className="logo"/>
    </Col><Col span={12}>
        <Typography className={"mainTitle"}>
            <Title style={{marginBottom: 0}}>登录</Title>
        </Typography>
    </Col></Row>
    </div>
);

class LoginFormCore extends React.Component {
    constructor(props) {
        super(props);
        this.onRegister = props.onRegister;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post(ApiRoot + '/adminLogin', qs.stringify(values)).then(res => res.data).then((res) => {
                    if (res["status"] === 200) {
                        window.sessionStorage.setItem("token", res["data"]["token"]);
                        const {history} = this.props;
                        message.success('登录成功');
                        history.replace("/index");
                    } else {
                        message.error(res["message"]);
                    }
                }).catch((res) => {
                    message.error('登录失败，请重试！');
                }).finally(() => {

                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="loginForm">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            {required: true, message: '请输入用户名！'}
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码！'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住我的登录状态</Checkbox>)}
                    <Button type={"link"} className="login-form-forgot">
                        忘记密码
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button.Group>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button onClick={this.onRegister}>
                            注册
                        </Button>
                    </Button.Group>
                </Form.Item>
            </Form>
        )
    }
}

const LoginForm = (
    withRouter(Form.create({name: 'login'})(LoginFormCore))
);

const RegisterForm = Form.create({name: 'register_form'})(
    class extends React.Component {
        state = {
            gender: ''
        };

        onGenderChange = e => {
            this.setState({
                gender: e.value
            });
        };

        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator, getFieldValue} = form;
            return (
                <Modal
                    visible={visible}
                    title="注册账户"
                    okText="注册"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="用户名">
                            {getFieldDecorator('user', {
                                rules: [{required: true, min: 6, max: 16, message: '请输入6-16位的用户名！'}],
                            })(<Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="用户名"
                            />,)}
                        </Form.Item>
                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: '请输入密码！'},
                                    {pattern: /^[a-z_A-Z0-9.]{6,16}$/, message: '请输入6-16位密码（仅由数字、大/小写字母、下划线、点组成）'}
                                ],
                            })(<Input
                                prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type={"password"}
                                placeholder="密码"
                            />,)}
                        </Form.Item>
                        <Form.Item label="确认密码">
                            {getFieldDecorator('confirm_password', {
                                rules: [
                                    {required: true, message: '请重新输入密码！'},
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value === getFieldValue('password')) callback();
                                            else callback('请输入与原密码一致的确认密码！');
                                        }
                                    }
                                ],
                            })(<Input
                                prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type={"password"}
                                placeholder="密码"
                            />,)}
                        </Form.Item>
                        <Form.Item label="性别">
                            {getFieldDecorator('gender', {
                                rules: [{required: true, message: '请选择性别！'}],
                            })(
                                <Radio.Group onChange={this.onGenderChange}>
                                    <Radio value={'M'}>男</Radio>
                                    <Radio value={'F'}>女</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label="电子邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {required: true, message: '请输入电子邮箱！'},
                                    {
                                        pattern: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}}$/,
                                        message: '请输入格式正确的电子邮箱地址！'
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="电子邮箱"
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class Login extends React.Component {
    state = {
        visible: false
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    render() {
        return (
            <div className={"mainPart"}>
                <Card title={LoginCardTitle} className={"mainCard"}>
                    <LoginForm onRegister={this.showModal}/>
                </Card>
                <RegisterForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
            </div>

        );
    }
}

export default Login;