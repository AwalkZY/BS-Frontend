import React, {Component} from "react";
import {TimelineLite} from "gsap/all";
import {Avatar, Badge, Button, Card, Descriptions, Divider, Icon, Tag, Tooltip} from "antd";
import style from "./ReversibleCard.module.css";

const {Meta} = Card;
const ButtonGroup = Button.Group;

class Detail extends Component{
    render() {
        return (
            <div>
                <Descriptions bordered column={1} size={"small"}>
                    <Descriptions.Item label="书名">
                        {this.props.item.name}
                        <Divider type={"vertical"}/>
                        <Button href={"https://www.amazon.cn/s?k="+this.props.item.name+"&__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&ref=nb_sb_noss"} size={"small"} >
                            <Icon type="amazon"/>
                            <span className={style.hiddenSm}>Amazon</span>
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="价格">￥{this.props.item.current} / ￥{this.props.item.original}</Descriptions.Item>
                    <Descriptions.Item label="类别">
                        {
                            this.props.item.tags.split(";").map(x => {
                                return <Tag color="#108ee9">{x}</Tag>
                            })
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="状态">
                        {(() => {
                            if (this.props.item.buyer === null) {
                                return <Badge status="success" text="可购买"/>;
                            } else if (this.props.item.buyer < 0) {
                                return <Badge status="processing" text="交易中"/>;
                            } else return <Badge status="default" text="交易结束"/>;
                        })()}
                    </Descriptions.Item>
                    <Descriptions.Item label="ISBN">
                        {this.props.item.isbn}
                    </Descriptions.Item>
                    <Descriptions.Item label="卖家">
                        {this.props.item.seller}
                        <Divider type={"vertical"}/>
                        <Button size={"small"} >
                            <Icon type="mail"/>
                            <span className={style.hiddenSm}> 联系</span>
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="操作">
                        <ButtonGroup>
                            <Tooltip placement={"bottom"} title={this.props.item.deliver === "offline" ? "线下交易购买" : "快递递送购买"}>
                            <Button type={"primary"} size={"small"} >
                                <Icon type="shopping"/>
                                <span className={style.hiddenSm}>购买</span>
                            </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default class ReversibleCard extends Component {
    state = {
        status: true
    };

    componentDidMount(){
        this.cardTween = new TimelineLite({ paused:true })
            .to(this.cardContainer, 0.25, {
                transform: "rotateY(90deg)",
                onComplete: () => {
                    this.setState({
                        status: !this.state.status
                    })
                }
            })
            .to(this.cardContainer, 0.35, {
                transform: "rotateY(0deg)"
            });
    }

    reverse = () => {
        this.cardTween.restart();
    };

    FrontCard = (item) => (
        <Card style={{height: 350}}
              cover={
                  <div style={{textAlign: "center", height: 225}}>
                      <img alt="example"
                           className={style.coverImg}
                           src={item.image}/>
                  </div>
              }
              onTouchStart={(e) => {this.reverse();}}
              onMouseEnter={(e) => {this.reverse();}}
        >
            <Meta
                avatar={<Avatar src={item.sellerAvatar}/>}
                title={item.name}
                description={
                    <div style={{maxHeight: 45, overflow: "auto"}}>
                        {item.description}
                    </div>
                }/>
        </Card>
    );

    BackCard = (item) => (
        <Card style={{height: 350, overflow: "auto"}} onTouchStart={(e) => {this.reverse();}} onMouseLeave={(e) => {this.reverse();}}>
            <Detail item={item}/>
        </Card>
    );

    render() {
        return <div ref={node => this.cardContainer = node}>{this.state.status ? this.FrontCard(this.props.item) : this.BackCard(this.props.item)}</div>
    }
}
