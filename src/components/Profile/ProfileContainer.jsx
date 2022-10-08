import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, updateStatus, getStatus, savePhoto} from "../../redux/profile-reducer";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    refreshProfile(){
        let userId = this.props.router.params.userId ;
        if(!userId){
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId)
    }


    componentDidMount() {
        this.refreshProfile()

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    //     console.log(this.props)
    //     if(this.props.profile.userId != this.props.authorizedId){
    //         this.refreshProfile()
    //     }
    //
    // }

    render() {
        //console.log(this.props.match )
        console.log(this.props.authorizedUserId)
        return(
            <Profile {...this.props}
                     //isOwner={this.props.profile.userId === this.props.authorizedId }
                     isOwner={true}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }

}

//let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    savePhoto: state.profilePage.savePhoto
})

function withRouter(Component) {


    function ComponentWithRouterProp(props) {

        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    //withAuthRedirect

)(ProfileContainer)

//export default connect(mapStateToProps, {getUserProfile, setUserProfile})(withRouter(ProfileContainer));

