import React, {Component, ComponentProps} from 'react';
import {
    Button,
    Divider,
    Typography,
    Input,
    Select,
    Card,
    Row,
    Col,
    Tooltip,
    Icon,
    Pagination,
    Tag,
    Collapse,
    Table,
    Badge,
    Form, Upload, Drawer
} from "antd";
import style from './need.module.css';
import BookDrawer from '../../components/bookDrawer/bookDrawer';

const {Title} = Typography;
const Search = Input.Search;
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const {Option} = Select;
const {Meta} = Card;
const {Panel} = Collapse;


class NeedTable extends Component {
    columns = [
        {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
            render: (text, record) => "《 "+text+" 》"
        },
        {
            title: '意向价格',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => "￥ "+text,
            sorter: (a, b) => a.price - b.price
        },
        {
            title: '发布时间',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        },
        {
            title: '买家',
            dataIndex: 'buyer',
            key: 'buyer',
            sorter: (a, b) => a.buyer.localeCompare(b.buyer, 'zh-CN')
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
            sorter: (a, b) => a.tags.length - b.tags.length
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                switch (text) {
                    case 0: return (<Badge status="success" text="完成" />);
                    case 1: return (<Badge status="processing" text="进行中" />);
                    case 2: return (<Badge status="default" text="取消" />);
                    default: return (<Badge status="error" text="错误" />);
                }
            },
            sorter: (a, b) => a.status - b.status
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <ButtonGroup>
                    <Button type={"primary"} onClick={() => {this.props.onResponse(record)}}>响应</Button>
                    <Button>联系买家</Button>
                </ButtonGroup>
            ),
        },
    ];

    data = [
        {
            key: '1',
            name: '活着',
            time: '2019-06-26',
            tags: ['nice', 'developer'],
            price: 100,
            status: 0,
            buyer: '小王'
        },
        {
            key: '2',
            name: '老人与海',
            time: '2019-06-27',
            tags: ['nice', 'developer', 'what?'],
            price: 50,
            status: 1,
            buyer: '小李'
        },{
            key: '3',
            name: '红楼梦',
            time: '2019-09-26',
            tags: ['developer'],
            price: 1000,
            status: 2,
            buyer: '小张'
        },{
            key: '4',
            name: '汤姆索亚历险记',
            time: '2016-06-26',
            tags: [],
            price: 1050,
            status: 0,
            buyer: '小赵'
        }
    ];

    render() {
        return (
            <Table columns={this.columns} dataSource={this.data} />
        )
    }
}

class NeedDrawer extends Component{
    componentDidMount(){
        this.props.onRef(this)
    }

    state = {
        visible : false
    };

    showDrawer = () => {
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
        return (
            <Drawer
                title="发布需求信息"
                placement="left"
                width={300}
                closable={false}
                onClose={this.hideDrawer}
                visible={this.state.visible}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="书名">
                        <Input placeholder="请输入书籍名称"/>
                    </Form.Item>
                    <Form.Item label="意向价格">
                        <Input placeholder="请输入预期购入价格"/>
                    </Form.Item>
                    <Form.Item label="类别">
                        <Input placeholder="请输入书籍类别信息"/>
                    </Form.Item>
                    <Divider/>
                    <ButtonGroup>
                        <Button onClick={this.hideDrawer}>关闭</Button>
                        <Button type={"primary"} onClick={void (0)}>提交</Button>
                    </ButtonGroup>
                </Form>
            </Drawer>
        )
    }
}

class Need extends Component {
    state = {
        tip: "",
        field: "",
        target: null
    };

    refNeedDrawer = ref => {
        this.needDrawer = ref
    };

    refResponseDrawer = ref => {
        this.responseDrawer = ref
    };

    render() {
        return (
            <div className={style.main}>
                <Typography>
                    <Title className={style.mainTitle}>书籍求购</Title>
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
                        <Input defaultValue="26888888" key={0}
                               suffix={<Tooltip title="Extra information">
                                   <Icon type="info-circle" style={{width: "100%", color: 'rgba(0,0,0,.45)'}}/>
                               </Tooltip>}/>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={4}>
                        <ButtonGroup style={{width: "100%"}}>
                            <Button style={{width: "40%"}}><Icon type="search"/>查询</Button>
                            <Button style={{width: "60%"}} type={"primary"} onClick={(e) => this.needDrawer.showDrawer()}><Icon
                                type="plus"/>发布需求</Button>
                        </ButtonGroup>
                    </Col>
                </Row></InputGroup>
                <Divider/>
                <div className={style.display}>
                    <NeedTable onResponse={(record) => {
                        this.responseDrawer.showDrawer(record);
                    }}/>
                </div>
                <NeedDrawer onRef={this.refNeedDrawer}/>
                <BookDrawer onRef={this.refResponseDrawer}/>
            </div>
        );
    }
}

export default Need;