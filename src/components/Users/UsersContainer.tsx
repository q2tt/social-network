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
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type PropsType = {
    currentPage: number
    pageSize: number
    pageNumber: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>

    getUsers: (currentPage: number, pageSize: number) => void
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
        
}




class UsersContainer extends React.Component<PropsType>{


    componentDidMount() {
        this.props.getUsers( this.props.currentPage , this.props.pageSize)
    }


    onPageChanged = (pageNumber: number) => {
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
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }


}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
    connect  (
        mapStateToProps, 
        {follow, unfollow, getUsers })
)(UsersContainer )


// export default compose(
//     withAuthRedirect,
//     connect <MapStatePropsType, MapDispatchPropsType, AppStateType>(
//         mapStateToProps, 
//         {follow, unfollow, getUsers })
// )(UsersContainer )

