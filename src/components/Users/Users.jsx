import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpeg";
import {NavLink} from "react-router-dom";

import Paginator from "../common/Paginator/Paginator";

let Users = ({currentPage, onPageChanged, pageSize , totalUsersCount,    ...props}) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize) ;
    let pages = [];
    for(let i =1; i <= pageCount; i++){
        pages.push(i)
    }
console.log(props)
    return  <div>
        <div className={s.paginatorBox}>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
        </div>
        {
            props.users.map( u => <div key={u.id}>

                <div className={s.user}>
                    <div className={s.userPhoto}>
                        <NavLink to={'/profile/'+u.id}  >
                             <img className={s.photo} src={u.photos.small != null ? u.photos.small:userPhoto}/>
                        </NavLink>

                        <div>

                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id=>id===u.id)}
                                          onClick={() => {
                                              props.unfollow(u.id)
                                     }}
                                          className={s.btnFollow}>Unfollow</button>

                                :<button disabled={props.followingInProgress.some(id=>id===u.id)}
                                         onClick={() => {
                                             props.follow(u.id)
                                         }} className={s.btnFollow}>Follow</button>
                            }
                        </div>

                    </div>
                    <div className={s.userInfo}>
                        <div className={s.userName}>{u.name}</div>
                        <div className={s.userMessage}> {u.status}</div>
                    </div>

                </div>
            </div> )
        }
    </div>
}

export default Users;