import React from "react";
import s from './News.module.css';
import Paginator from "../common/Paginator/Paginator";



let News =(props) => {

    let pageCount = Math.ceil(props.totalNewsCount / props.pageSize) ;
    let pages = [];
    for(let i =1; i <= pageCount; i++){
        pages.push(i)
    }
    console.log(pageCount)
    console.log(pages)



    return  <div className={s.box}>
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalUsersCount={props.totalNewsCount} pageSize={props.pageSize} />

        <div className={s.newsBox}>


            {  props.newsPortion.map( n => <div key={n.id}>
                <div className={s.news}>
                    <h4>{n.title}</h4>
                    <p>{n.content}</p>
                    <p>{n.description}</p>
                    <a href={n.url}  target="_blank" className={s.link} >read more...</a>
                    <img className={s.photo} src={n.urlToImage} />
                    <p className={s.author} >{n.author}</p>

                    </div>
            </div>)}
        </div>
    </div>
}

export default News;
