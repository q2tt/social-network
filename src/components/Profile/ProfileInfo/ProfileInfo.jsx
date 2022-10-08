import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";

import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from './../../../assets/images/user.jpeg'

const ProfileInfo = (props) =>{

    if(!props.profile){
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.img_back}>
                <img src="https://get-edu.kz/wp-content/uploads/2020/04/helpbox-contact.jpg" alt=""></img>

            </div>
            <div className={s.information}>
                <div className={s.photo}>
                    <img src={props.profile.photos.large || userPhoto } alt="photo"></img>
                    <p>Change a photo:</p>
                    {props.isOwner && <input className={s.btnChangePhoto} type={'file'}  onChange={onMainPhotoSelected }/>}
                </div>
                <div className={s.info }>
                    <h1>{props.profile.fullName} </h1>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    <ProfileData profile={props.profile}/>

                </div>
            </div>
    </div>
    )
}

const ProfileData = (props) => {
    return  <div >

        <p className={s.users_data}><span className={s.datas_title}>Looking for a job: </span>{props.profile.lookingForAJob}</p>
        <p className={s.users_data}><span className={s.datas_title}>Work: </span>{props.profile.lookingForAJobDescription}</p>
        <p className={s.users_data}><span className={s.datas_title}>Name: </span>{props.profile.fullName}</p>
        <div>{Object.keys(props.profile.contacts).map(key => {
            return  <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/> })}</div>

    </div>

}
const Contact = ({contactTitle, contactValue}) => {
    return <div>
        <p className={s.users_data}><span className={s.datas_title}>{contactTitle} : </span>{contactValue}</p>
    </div>
}
export default ProfileInfo;