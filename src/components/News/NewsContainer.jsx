import React from "react";
import  {getNews, setNewsPortion, setCurrentPage} from "../../redux/news-reduser";
import News from "./News";
import {connect} from "react-redux";



class NewsContainer extends React.Component {

    componentDidMount() {
        this.props.getNews()
    }

    onPageChanged = (p) => {
        let  viewedNews = (p-1)* this.props.pageSize;
        this.props.setNewsPortion( viewedNews)
        this.props.setCurrentPage(p)
    }





    render() {



        return <News
            news={this.props.news}
            newsPortion={this.props.newsPortion}
            pageSize={this.props.pageSize}
            totalNewsCount={this.props.totalNewsCount}
            onPageChanged={this.onPageChanged}
            currentPage={this.props.currentPage}
        />
    }
}


let mapStateToProps = (state) => {
    return{
        news: state.news.news,
        newsPortion: state.news.newsPortion,
        totalNewsCount: state.news.totalNewsCount,
        pageSize: state.news.pageSize,
        currentPage: state.news.currentPage
    }
}


export default  connect( mapStateToProps, {getNews, setNewsPortion,  setCurrentPage})(NewsContainer)
