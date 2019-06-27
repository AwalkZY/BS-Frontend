import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: !!window.sessionStorage.getItem("token") || !!this.props.token
        }
    }

    componentWillMount() {
        if(!this.state.isAuthenticated){
            const {history} = this.props;
            history.replace("/login");
        }
    }

    render() {
        let { component: Component, ...rest} = this.props;
        return this.state.isAuthenticated ?
            (<Route {...rest} render={(props) => ( <Component {...props} />
            )}/> ) : (<div>请登录</div>)
    }
}

const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));