import React, {useState} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';
import {Suspense} from "react";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import NewsContainer from "./components/News/NewsContainer";
import SettingsContainer from "./components/Settings/SettingsContainer";
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};

class App  extends React.Component  {


    componentDidMount() {
        this.props.initializeApp();

    }
    render(){

        if(!this.props.initialized){
            return <Preloader />
        }



        return (
            <BrowserRouter>

                <div className="app-wrapper">
                    <HeaderContainer  />
                    <Navbar />
                    <div className="app-wrapper-content">
                        <Suspense fallback={<div><Preloader /></div>}>
                            <Routes>
                                <Route path="/profile/:userId"  element={<ProfileContainer  />}
                                />
                                <Route path='/profile' element={<ProfileContainer />} />
                                <Route path="/dialogs" element={<DialogsContainer store={this.props.store}
                                />} />
                                <Route path="/users" element={<UsersContainer store={this.props.store}
                                />} />                                         dispatch={this.props.dispatch} />} />*/}
                                <Route path="/login" element={<Login />}
                                />} />
                                <Route path='/news' element={<NewsContainer />} />
                                <Route path='/settings' element={<SettingsContainer />} />
                            </Routes>
                        </Suspense>

                    </div>

                </div>
            </BrowserRouter>

        )
    }

}

let WithUrlDataContainerComponent = withRouter(App);


const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose (connect(mapStateToProps , {initializeApp}))(WithUrlDataContainerComponent)
