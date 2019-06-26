import React, {Component} from 'react';
import {
    Button,
    Divider,
    Typography,
    Input,
    Select,
    Row,
    Col,
    Tooltip,
    Icon,
    Pagination, Empty
} from "antd";
import style from './index.module.css';
import ReversibleCard from '../../components/reversibleCard/reversibleCard'
import BookDrawer from '../../components/bookDrawer/bookDrawer';

const {Title} = Typography;
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const {Option} = Select;

class Index extends Component {
    state = {
        tip: "",
        field: "",
        visible: false,
        loading: false
    };

    bookList = [
        {
            id: 1,
            name: "三国演义",
            isbn: "9780136019701",
            seller: "小张",
            original: 166,
            current: 16,
            sellerAvatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            base64Img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3542693902,1170137576&fm=26&gp=0.jpg",
            description: "一本好书！九五成新",
            tags: ["文学类", "历史类"],
            status: 0
        }
    ];
    refBookDrawer = ref => {
        this.bookDrawer = ref
    };

    render() {
        return (
            <div className={style.main}>
                <Typography>
                    <Title className={style.mainTitle}>首页</Title>
                </Typography>
                <Divider/>
                <InputGroup><Row>
                    <Col xs={9} sm={6} md={3} lg={2}><Select defaultValue="name" style={{width: "100%"}}>
                        <Option value="name">书名</Option>
                        <Option value="isbn">ISBN</Option>
                        <Option value="price">价格</Option>
                        <Option value="category">类别</Option>
                    </Select></Col>
                    <Col xs={15} sm={18} md={14} lg={18}>
                        <Input defaultValue="26888888" key={1}
                               suffix={<Tooltip title="Extra information">
                                   <Icon type="info-circle" style={{width: "100%", color: 'rgba(0,0,0,.45)'}}/>
                               </Tooltip>}/>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={4}>
                        <ButtonGroup style={{width: "100%"}}>
                            <Button style={{width: "40%"}}><Icon type="search"/>查询</Button>
                            <Button style={{width: "60%"}} type={"primary"}
                                    onClick={(e) => this.bookDrawer.showDrawer()}><Icon
                                type="plus"/>添加书籍</Button>
                        </ButtonGroup>
                    </Col>
                </Row></InputGroup>
                <Divider/>
                <div className={style.display}>
                    {
                        this.bookList.length !== 0 ? (
                            <Row gutter={24}>
                                {
                                    this.bookList.map((item) => {  //todo: BookList放到store里
                                        return (
                                            <Col xs={24} sm={12} md={6} lg={6} style={{marginTop: 12}} key={item.id}>
                                                <ReversibleCard item={item}/>
                                            </Col>
                                        )
                                    })}
                            </Row>
                        ) : (
                            <Empty description="暂无书籍数据"/>
                        )
                    }
                </div>
                <Divider/>
                <Pagination size="small" style={{textAlign: "center"}} defaultCurrent={1} total={50}/>
                <BookDrawer onRef={this.refBookDrawer}/>
            </div>
        );
    }
}

export default Index;