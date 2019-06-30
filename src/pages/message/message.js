import React, {Component} from 'react';
import {List, Avatar, Card, Typography, Divider, message, Button} from "antd";
import style from './message.module.css';
import {Get, Post} from "../../helper/Api";
import MessageModal from "../../components/MessageModal/MessageModal";

const {Title} = Typography;

class Message extends Component{
    state = {
        messages: [],
        visible: false
    };

    flushMessage(){
        Get('/message',{},{}).then(data => this.setState({
            messages: data["info"]
        })).catch(msg => message.error(msg));
    }

    componentDidMount(): void {
        // setInterval(() => this.flushMessage(),2000);
        this.flushMessage();
    }

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
            console.log(values);
            if (err) {
                return;
            }
            Post('/message', values).then(data => {
                this.setState({visible: false});
                message.success("发送成功");
                form.resetFields();
            }).catch(msg => {
                message.error(msg);
            });
        });
    };

    render() {
        return (
            <div className={style.main}>
                <Typography>
                    <Title className={style.mainTitle}>消息</Title>
                </Typography>
                <Divider/>
                <Card className={style.display}><List
                    itemLayout="horizontal"
                    dataSource={this.state.messages}
                    renderItem={item => (
                        /*<Button type={"link"}>标为已读</Button>,*/
                        <List.Item actions={[<Button type={"link"} onClick={this.showModal}>回复</Button>]}>
                            <List.Item.Meta
                                avatar={item.direction ? <Avatar src={item.receiverAvatar} /> : <Avatar src={item.senderAvatar} />}
                                title={item.direction ? "我 发送给 " + item.receiverName : item.senderName + "发送给 我"}
                                description={item.content}
                            />
                            {/*<span>已阅读</span>*/}
                        </List.Item>
                    )}
                /></Card>
                <MessageModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
export default Message;