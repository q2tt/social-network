import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {useTheme} from "../../hooks/use-theme";

function Navbar() {

    return (
        <nav className={classes.nav}>
            <div className={classes.navbar}>
                <div className={`${classes.container} ${classes.navContainer}`}>
                    <input className={classes.checkbox} type="checkbox" name="" id=""/>
                    <div className={classes.hamburgerLines}>
                        <span className={`${classes.line} ${classes.line1}`}></span>
                        <span className={`${classes.line} ${classes.line2}`}></span>
                        <span className={`${classes.line} ${classes.line3}`}></span>
                    </div>
                    <div className={classes.menuItems}>
                        <li><div className={`${classes.item} ${classes.active}`}>
                            <NavLink to={"/profile"}
                                     className={navData => navData.isActive ? classes.active : classes.item1}>Profile</NavLink>
                        </div></li>
                        <li>
                            <div className={classes.item}>
                                <NavLink to={"/dialogs"}
                                         className={navData => navData.isActive ? classes.active : classes.item1}>Dialogs</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className={classes.item}>
                                <NavLink to={"/users"}
                                         className={navData => navData.isActive ? classes.active : classes.item1}>Users</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className={classes.item}>
                                <NavLink to={"/news"}
                                         className={navData => navData.isActive ? classes.active : classes.item1}>News</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className={classes.item}>
                                <NavLink to={"/settings"}
                                         className={navData => navData.isActive ? classes.active : classes.item1}>Settings</NavLink>
                            </div>
                        </li>
                    </div>
                </div>
            </div>

            {/*<div>*/}
            {/*    <div className={`${classes.item} ${classes.active}`}>*/}
            {/*        <NavLink to={"/profile"}*/}
            {/*                 className={navData => navData.isActive ? classes.active : classes.item1}>Profile</NavLink>*/}
            {/*    </div>*/}
            {/*    <div className={classes.item}>*/}
            {/*        <NavLink to={"/dialogs"}*/}
            {/*                 className={navData => navData.isActive ? classes.active : classes.item1}>Dialogs</NavLink>*/}
            {/*    </div>*/}
            {/*    <div className={classes.item}>*/}
            {/*        <NavLink to={"/users"}*/}
            {/*                 className={navData => navData.isActive ? classes.active : classes.item1}>Users</NavLink>*/}
            {/*    </div>*/}
            {/*    <div className={classes.item}>*/}
            {/*        <NavLink to={"/news"}*/}
            {/*                 className={navData => navData.isActive ? classes.active : classes.item1}>News</NavLink>*/}
            {/*    </div>*/}

            {/*    <div className={classes.item}>*/}
            {/*        <NavLink to={"/settings"}*/}
            {/*                 className={navData => navData.isActive ? classes.active : classes.item1}>Settings</NavLink>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </nav>

    )
}

export default Navbar;