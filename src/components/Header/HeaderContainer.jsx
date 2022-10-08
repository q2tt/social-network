import Header from "./Header";
import React from "react";
import { logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component  {


    render (){
        return <Header {...this.props} />
    }
}



let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email,

})
export default connect(mapStateToProps, { logout})(HeaderContainer)
