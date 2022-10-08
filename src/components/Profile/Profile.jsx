import c from './Profile.module.css';
import MyPosts from "./Posts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./Posts/MyPostContainer";

const Profile = (props) => {



    return (
      
      <div >
          <ProfileInfo profile={props.profile} isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}  savePhoto={props.savePhoto}/>
        <MyPostsContainer store={props.store}

        />
        
      </div>
    )
}

export default Profile;