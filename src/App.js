import React, {Component} from 'react';
import {Layout, Menu, Icon, Row, Col, Button, Badge, Avatar, Dropdown, Divider} from 'antd';
import {Switch, BrowserRouter as Router, Route, Link} from "react-router-dom"
import style from './App.module.css';
import logo from './logo.png'
import Index from './pages/index/index'
import Message from './pages/message/message'
import Need from './pages/need/need'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {mainReducer} from "./store/reducers";
import PrivateRoute from './middlewares/auth'
import Login from "./pages/login/login";
import {concatClasses} from "./helper/globalFunction";

const store = createStore(mainReducer);
const {Header, Content, Footer} = Layout;

const MyMenu = (
    <Menu>
        <Menu.Item>
            <Button type={"link"} style={{color: "black"}}>
                <Icon type="edit"/>
                <Divider type={"vertical"}/>
                修改资料
            </Button>
        </Menu.Item>
        <Menu.Item>
            <Button type={"link"} style={{color: "black"}}>
                <Icon type="logout"/>
                <Divider type={"vertical"}/>
                登出
            </Button>
        </Menu.Item>
    </Menu>
);

class MyHeader extends React.Component {
    state = {
        msgNumber: 6
    };

    render() {
        return (
            <Header><Row>
                <Col span={5}>
                    <img className={style.appLogo} src={logo} alt={"logo"}/>
                    <span className={concatClasses(style.brand,style.hiddenSm)} >
                                书籍交易系统
                            </span>
                </Col>
                <Col span={15}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["index"]}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="index">
                            <Link to={"index"}>
                                <Icon type="home"/>
                                首页
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="need">
                            <Link to={"need"}>
                                <Icon type="solution"/>
                                书籍求购
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="message" onClick={void (0)}>
                            <Link to={"message"}>
                                <Icon type="mail"/>
                                邮件消息
                                <Badge count={this.state.msgNumber} style={{marginLeft: 8}}/>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    <Dropdown overlay={MyMenu}>
                        <div style={{float: "right"}}>
                            <Avatar shape="square" icon="user"/>
                            <Divider type={"vertical"} className={style.hiddenSm}/>
                            <span className={concatClasses(style.username, style.hiddenSm)}>
                                     Desmond
                            </span>
                        </div>
                    </Dropdown>
                </Col>
            </Row>
            </Header>
        );
    }
}

const MainLayout = () => (
    <Layout className="layout"><Router>
        <MyHeader/>
        <Content style={{padding: '0 50px'}}>
            <Route path={"/index"} component={Index}/>
            <Route path={"/need"} component={Need}/>
            <Route path={"/message"} component={Message}/>
        </Content>
        <Footer style={{textAlign: 'center'}}>Created by Desmond Zhao</Footer>
    </Router></Layout>
);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className={style.app}>
                    <Router>
                        <Switch>
                            <Route path={"/login"} component={Login}/>
                            <PrivateRoute path={"/"} component={MainLayout}/>
                        </Switch>
                    </Router>
                </div>
            </Provider>
        );
    }
}