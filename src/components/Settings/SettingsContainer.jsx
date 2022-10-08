import React from "react";
import {connect} from "react-redux";
import {getTheme} from "../../redux/settings-reducer";


class SettingsContainer extends React.Component {

    constructor() {
        super();
        this.lela = this.lela.bind(this)
    }

    lela(){
         this.props.getTheme('lights')
        console.log('h')
    }

    render() {
        console.log(this.props)


        return (
            <div>
            </div>
            )


    }
}

let mapStateToProps = (state) => {
    return{
        theme: state.settings.theme
    }
}


export default  connect( mapStateToProps, {getTheme})(SettingsContainer)
