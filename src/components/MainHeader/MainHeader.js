import {Avatar, Badge, Button, Col, Divider, Dropdown, Icon, Menu, message, Row, Layout} from "antd";
import style from "./MainHeader.module.css";
import logo from "../../logo.png";
import {ConcatClasses} from "../../helper/GlobalFunction";
import {Link, withRouter} from "react-router-dom";
import React from "react";
import InfoForm from "../InfoForm/InfoForm";
import {Post} from "../../helper/Api";
import {addAvatar, delToken, addToken} from "../../store/actions"
import {connect} from "react-redux";

const {Header} = Layout;

class MainHeader extends React.Component{
    state = {
        visible: false
    };

    componentWillMount(): void {
        if (!!window.sessionStorage.getItem("avatar")) {
            this.props.addAvatar(window.sessionStorage.getItem("avatar"));
        }
        if (!!window.sessionStorage.getItem("token")) {
            this.props.addToken(window.sessionStorage.getItem("token"));
        }
    }

    logout = () => {
        this.props.delToken();
        window.sessionStorage.removeItem("token");
        message.success("登出成功！");
        this.props.history.replace("/login");
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
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
            Post('/user', values).then(data => {
                this.setState({visible: false});
                message.success("注册成功");
                form.resetFields();
            }).catch(msg => {
                message.error(msg);
            });
        });
    };

    MyMenu = (
        <Menu>
            <Menu.Item>
                <Button type={"link"} style={{color: "black"}} onClick={this.logout}>
                    <Icon type="logout"/>
                    <Divider type={"vertical"}/>
                    登出
                </Button>
            </Menu.Item>
        </Menu>
    );

    render(){
        return (
            <div>
                <Header><Row>
                    <Col span={5}>
                        <img className={style.appLogo} src={logo} alt={"logo"}/>
                        <span className={ConcatClasses(style.brand, style.hiddenSm)}>
                                书籍交易系统
                            </span>
                    </Col>
                    <Col span={15}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[this.props.history.location.pathname]}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="/index">
                                <Link to={"/index"}>
                                    <Icon type="home"/>
                                    首页
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/need">
                                <Link to={"/need"}>
                                    <Icon type="solution"/>
                                    书籍求购
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/message">
                                <Link to={"/message"}>
                                    <Icon type="mail"/>
                                    邮件消息
                                    {/*<Badge count={6} style={{marginLeft: 8}}/>*/}
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4}>
                        <Dropdown overlay={this.MyMenu}>
                            <div style={{float: "right"}}>
                                {!this.props.avatar ? <Avatar shape="square" icon="user"/> : <Avatar src={this.props.avatar} shape={"square"}/>}
                            {/*    <Divider type={"vertical"} className={style.hiddenSm}/>*/}
                            {/*    <span className={ConcatClasses(style.username, style.hiddenSm)}>*/}
                            {/*         Desmond*/}
                            {/*</span>*/}
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
                </Header>
                <InfoForm
                    wrappedComponentRef={this.saveFormRef}
                    title={"修改信息"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    avatar: state.avatar
});

const mapDispatchToProps = dispatch => ({
    delToken: () => dispatch(delToken()),
    addToken: (token) => dispatch(addToken(token)),
    addAvatar: (image) => dispatch(addAvatar(image))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MainHeader));