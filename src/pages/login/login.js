import React from 'react';
import {Card, message, Typography, Row, Col} from 'antd';
import './login.css'
import logo from "../../logo.png";
import {Post} from '../../helper/Api'
import LoginForm from "../../components/LoginForm/LoginForm";
import InfoForm from "../../components/InfoForm/InfoForm";

const {Title} = Typography;

const LoginCardTitle = (
    <div><Row gutter={12}><Col span={12}>
        <img src={logo} alt="logo" className="logo"/>
    </Col><Col span={12}>
        <Typography className={"mainTitle"}>
            <Title style={{marginBottom: 0}}>登录</Title>
        </Typography>
    </Col></Row>
    </div>
);


class Login extends React.Component {
    state = {
        visible: false
    };

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

    render() {
        return (
            <div className={"mainPart"}>
                <Card title={LoginCardTitle} className={"mainCard"}>
                    <LoginForm onRegister={this.showModal}/>
                </Card>
                <InfoForm
                    wrappedComponentRef={this.saveFormRef}
                    title={"注册账户"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
            </div>
        );
    }
}

export default Login;