import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
             <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/ZF_logo_STD_Blue_3CC.svg/800px-ZF_logo_STD_Blue_3CC.svg.png' alt="logo"></img>
             <div className={s.login}>
                 {props.isAuth
                     ? <div className={s.loginBlock}  ><div className={s.email}>{props.email}</div> <button className={s.btn}  onClick={props.logout}>Log out</button></div>
                     : <NavLink className={s.linkLogin}  to={'/login'}>Login </NavLink> }
             </div>
         </header>

    )
}
export default Header;
