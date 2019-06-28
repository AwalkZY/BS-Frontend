import {Form, Icon, Input, Modal} from "antd";
import React from "react";

const InfoForm = Form.create({name: 'register_form'})(
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form, title} = this.props;
            const {getFieldDecorator, getFieldValue} = form;
            return (
                <Modal
                    visible={visible}
                    title={title}
                    okText={"提交"}
                    cancelText={"关闭"}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="用户名">
                            {getFieldDecorator('username', {
                                rules: [{required: true, min: 6, max: 16, message: '请输入6-16位的用户名！'}],
                            })(<Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="用户名"
                            />)}
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
                        <Form.Item label="电子邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {required: true, message: '请输入电子邮箱！'},
                                    {
                                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
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

export default InfoForm;