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
    message,
    Icon,
    Pagination, Empty
} from "antd";
import style from './index.module.css';
import ReversibleCard from '../../components/ReversibleCard/ReversibleCard'
import BookDrawer from '../../components/BookDrawer/BookDrawer';
import {Get} from "../../helper/Api";

const {Title} = Typography;
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const {Option} = Select;

class Index extends Component {
    state = {
        field: "",
        visible: false,
        loading: false,
        bookList: []
    };

    componentDidMount(): void {
        Get('/book',{},{

        }).then(data => {
            this.setState({
                bookList: data["info"]
            });
            console.log(data["info"]);
        }).catch(msg => message.error(msg));
    }

    refBookDrawer = ref => {
        this.bookDrawer = ref
    };

    onChange = e => {
        this.setState({
            field: e.value
        })
    };

    render() {
        return (
            <div className={style.main}>
                <Typography>
                    <Title className={style.mainTitle}>首页</Title>
                </Typography>
                <Divider/>
                <InputGroup><Row>
                    <Col xs={9} sm={6} md={3} lg={2}><Select defaultValue="name" onChange={this.onChange} style={{width: "100%"}}>
                        <Option value="name">书名</Option>
                        <Option value="isbn">ISBN</Option>
                        <Option value="price">价格</Option>
                        <Option value="category">类别</Option>
                    </Select></Col>
                    <Col xs={15} sm={18} md={14} lg={18}>
                        <Input key={1}/>
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
                        this.state.bookList.length !== 0 ? (
                            <Row gutter={24}>
                                {
                                    this.state.bookList.map((item) => {  //todo: 可以尝试放到store里
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