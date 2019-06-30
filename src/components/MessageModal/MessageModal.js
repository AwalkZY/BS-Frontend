import React from 'react';
import {Form, Input, Modal} from "antd";

const MessageModal = Form.create({ name: 'messageForm' })(
    class extends React.Component {
        componentDidMount(): void {
            if (this.props.receiver != null) {
                this.props.form.setFieldsValue({
                    "receiver": this.props.receiver
                })
            }
        }

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="发送信息"
                    okText="发送"
                    cancelText={"取消"}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="收信人">
                            {getFieldDecorator('receiver', {
                                rules: [{ required: true, message: '请输入收信人昵称!' }],
                            })(<Input placeholder={"收信人昵称"}/>)}
                        </Form.Item>
                        <Form.Item label="信息内容">
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: '请输入信息内容!' }]
                            })(<Input.TextArea rows={4} placeholder={"信息内容"}/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default MessageModal;