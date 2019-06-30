import React, {Component} from 'react';
import {Layout} from 'antd';
import {Switch, BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import style from './App.module.css';
import Index from './pages/index'
import Message from './pages/message/message'
import Need from './pages/need/need'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'
import {MainReducer} from "./store/reducers";
import PrivateRoute from './middlewares/auth'
import Login from "./pages/login/login";
import MainHeader from "./components/MainHeader/MainHeader";
import {addAvatar, addToken} from "./store/actions";

const store = createStore(MainReducer);
window.$store = store;
const {Content, Footer} = Layout;

const MainLayout = () => (
    <Layout className="layout">
        <MainHeader/>
        <Content style={{padding: '0 50px'}}>
            <Route path={"/index"} component={Index}/>
            <Route path={"/need"} component={Need}/>
            <Route path={"/message"} component={Message}/>
            <Route>
                <Redirect to={"/index"}/>
            </Route>
        </Content>
        <Footer style={{textAlign: 'center'}}>Created by Desmond Zhao</Footer>
    </Layout>
);

class App extends Component {
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

export default App;
