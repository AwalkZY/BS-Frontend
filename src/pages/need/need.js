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
    message,
    Icon,
    Pagination,
    Tag,
    Collapse,
    Table,
    Badge,
    Form, Upload, Drawer
} from "antd";
import style from './need.module.css';
import BookDrawer from '../../components/BookDrawer/BookDrawer';
import {Get, Post} from "../../helper/Api";
import MessageModal from "../../components/MessageModal/MessageModal"
import InfoForm from "../../components/InfoForm/InfoForm";

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
                    {tags.split(";").map(tag => {
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
            dataIndex: 'book_id',
            key: 'book_id',
            render: (text, record) => {
                if (text === null) return (<Badge status="default" text="未满足" />);
                else return (<Badge status="success" text="已匹配" />);
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <ButtonGroup>
                    <Button type={"primary"} disabled={record.book_id !== null} onClick={() => {this.props.onResponse(record)}}>响应</Button>
                    <Button onClick={() => this.showModal()}>联系买家</Button>
                </ButtonGroup>
            ),
        },
    ];

    state = {
        needData : [],
        visible: false,
        buyer: ""
    };

    flushNeed(){
        Get("/need",{},{

        }).then(data => {
            this.setState({
                needData: data["info"]
            })
        }).catch(msg => message.error(msg));
    }

    componentDidMount(): void {
        this.flushNeed();
    }

    messageModalRef = formRef => {
        this.formRef = formRef;
    };

    showModal = () => {
        this.setState({
            visible: true
        });
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
                message.success("提交成功，刷新后查看已提交的需求");
                form.resetFields();
                this.flushNeed();
            }).catch(msg => {
                message.error(msg);
            });
        });
    };

    render() {
        return (
            <div>
                <Table columns={this.columns} locale={{emptyText:'暂无数据'}} dataSource={this.state.needData} />
                <MessageModal
                    wrappedComponentRef={this.messageModalRef}
                    visible={this.state.visible}
                    receiver={this.state.buyer}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}

const NeedForm = Form.create({name: 'need_form'})(
    class extends React.Component {
        handleCommit = () => {
            const {form} = this.props;
            form.validateFields((err, values) => {
                this.setState({
                    tipInfo : true
                });
                if (err) {
                    return;
                }
                Post('/need', values).then(data => {
                    this.setState({visible: false});
                    message.success("提交成功");
                    form.resetFields();
                    this.props.hideDrawer();
                }).catch(msg => {
                    message.error(msg);
                });
            });
        };

        render() {
            const {getFieldDecorator, getFieldValue} = this.props.form;
            return (
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item label="书名">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入书名！'}],
                        })(<Input placeholder="书籍名称"/>)}
                    </Form.Item>
                    <Form.Item label="意向价格">
                        {getFieldDecorator('price', {
                            rules: [{required: true, pattern: /^(?!0+(\.0+)?$)\d+(\.\d+)?|0$/, message: '请输入预期购入价格！'}],
                        })(<Input placeholder="预期购入价格"/>)}
                    </Form.Item>
                    <Form.Item label="类别">
                        {getFieldDecorator('tags', {
                            rules: [{required: true, message: '请输入类别！'}],
                        })(<Input placeholder="书籍类别信息，以英文分号分隔"/>)}
                    </Form.Item>
                    <Divider/>
                    <ButtonGroup>
                        <Button onClick={this.props.hideDrawer}>关闭</Button>
                        <Button type={"primary"} onClick={this.handleCommit}>提交</Button>
                    </ButtonGroup>
                </Form>
            )
        }
    }
);

class NeedDrawer extends Component{
    componentDidMount(){
        this.props.onRef(this);
        console.log(this);
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
                <NeedForm hideDrawer={this.hideDrawer}/>
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
                    {/*<Col xs={9} sm={6} md={3} lg={2}><Select defaultValue="name" style={{width: "100%"}}>*/}
                    {/*    <Option value="name">书名</Option>*/}
                    {/*    <Option value="isbn">ISBN</Option>*/}
                    {/*    <Option value="price">价格</Option>*/}
                    {/*    <Option value="category">类别</Option>*/}
                    {/*</Select></Col>*/}
                    {/*<Col xs={15} sm={18} md={14} lg={18}>*/}
                    {/*    <Input key={0}/>*/}
                    {/*</Col>*/}
                    {/*<Col xs={24} sm={24} md={7} lg={4}>*/}
                    <Col span={10} offset={7}>
                        <ButtonGroup style={{width: "100%"}}>
                            {/*<Button style={{width: "40%"}}><Icon type="search"/>查询</Button>*/}
                            <Button style={{width: "100%"}} type={"primary"} onClick={(e) => this.needDrawer.showDrawer()}><Icon
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