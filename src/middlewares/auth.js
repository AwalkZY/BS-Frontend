import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isAuthenticated: !!window.sessionStorage.getItem("token")
            isAuthenticated: true
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

export default withRouter(PrivateRoute);