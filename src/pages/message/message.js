import React, {Component} from 'react';
import {List, Avatar, Card, Typography, Divider} from "antd";
import style from './message.module.css';
const {Title} = Typography;

class Message extends Component{
    render() {
        return (
            <div className={style.main}>
                <Typography>
                    <Title className={style.mainTitle}>消息</Title>
                </Typography>
                <Divider/>
                <Card className={style.display}><List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item actions={[<a>标为已读/删除信息</a>,<a>回复</a>,<a>追踪</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={item.message}
                            />
                            <span>已阅读</span>
                        </List.Item>
                    )}
                /></Card>
            </div>
        );
    }
}

const data = [
    {
        title: '小赵',
        message: '你好，请问什么时候可以完成图书交易？'
    },
    {
        title: '小李',
        message: '你好，请问什么时候可以完成图书交易？'
    },
    {
        title: '小王',
        message: '你好，请问什么时候可以完成图书交易？'
    },
    {
        title: '小张',
        message: '你好，请问什么时候可以完成图书交易？'
    },
];

export default Message;