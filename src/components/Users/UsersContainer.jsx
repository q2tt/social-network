import React from "react";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    toggleIsFetching,
    unfollow,
    followingInProgressA,
    getUsers
} from "../../redux/users-reducer";

import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hooks/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getIsFetching,
    getTotalUsersCount,
    getUsersAll
} from "../../redux/users-selectors";


class UsersContainer extends React.Component{


    componentDidMount() {
        this.props.getUsers( this.props.currentPage , this.props.pageSize)
    }


    onPageChanged = (pageNumber) => {
        this.props.getUsers( pageNumber , this.props.pageSize)
    }


    render() {

        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize) ;
        let pages = [];
        for(let i =1; i <= pageCount; i++){
            pages.push(i)
        }
        return <>
            { this.props.isFetching ? <Preloader />:null }
            <Users
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage }
                onPageChanged={this.onPageChanged}
                unfollow={ this.props.unfollow}
                follow={ this.props.follow}
                users={ this.props.users}
                //followingInProgressA={this.props.followingInProgressA}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }


}


let mapStateToProps = (state) => {
    return{
        users: getUsersAll(state),
        pageSize: getPageSize(state),
        totalUsersCount:getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}




export default compose(
    withAuthRedirect,
    connect(
        mapStateToProps, {follow, unfollow,
        setCurrentPage, toggleIsFetching,
        followingInProgressA, getUsers })
)(UsersContainer )

