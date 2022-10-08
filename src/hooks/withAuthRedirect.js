import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";

let mapStateToPropsRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            if(!this.props.isAuth) return <Navigate to="/Login" />
            return <Component {...this.props} />
        }
    }

    let AuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent);

    return  AuthRedirectComponent
}