import React from "react";
import {Post} from "../../helper/Api";
import {Button, Checkbox, Form, Icon, Input, message} from "antd";
import {withRouter} from "react-router-dom";
import {addToken} from "../../store/actions";
import {connect} from "react-redux";

class LoginFormCore extends React.Component {
    componentWillMount(): void {
        if (!!window.sessionStorage.getItem("token") || !!this.props.token) {
            const {history} = this.props;
            history.replace('/index');
        }
    }

    constructor(props) {
        super(props);
        this.onRegister = props.onRegister;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Post('/session', values).then(data => {
                    if (this.props.form.getFieldValue("remember")) window.sessionStorage.setItem("token", data["token"]);
                    this.props.addToken(data["token"]);
                    const {history} = this.props;
                    message.success('登录成功');
                    history.replace("/index");
                }).catch(msg => {
                    message.error(msg);
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="loginForm">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            {required: true, message: '请输入用户名！'}
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码！'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住我的登录状态</Checkbox>)}
                    <Button type={"link"} className="login-form-forgot">
                        忘记密码
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button.Group>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button onClick={this.onRegister}>
                            注册
                        </Button>
                    </Button.Group>
                </Form.Item>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    addToken: (token) => dispatch(addToken(token))
});

const LoginForm = (
    withRouter(Form.create({name: 'login'})(LoginFormCore))
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);