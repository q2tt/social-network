import React, {useState} from "react";
import s from "./Paginator.module.css";

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number 
    totalUsersCount: number
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({currentPage, onPageChanged, pageSize , totalUsersCount, portionSize=10}) => {

    let pageCount = Math.ceil(totalUsersCount / pageSize) ;
    let pages = [];
    for(let i =1; i <= pageCount; i++){
        pages.push(i)
    }

    let portionCount = Math.ceil(pageCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber -1)*portionSize+1;
    let rightPortionPageNumber = portionNumber*portionSize;

    return  <div>
        {portionNumber>1 &&
        <button className={s.btnPaginator} onClick={()=> {setPortionNumber(portionNumber-1)}} >Prev</button>}
                {pages
                    .filter(p=>p>=leftPortionPageNumber && p<=rightPortionPageNumber)
                    .map( p =>{

                    return   <span className={currentPage === p  && s.selectedPage}
                                   onClick={(e) => {onPageChanged(p)}}> {p} </span>
                })}
        {portionCount>portionNumber &&
        <button className={s.btnPaginator} onClick={()=> {setPortionNumber(portionNumber+1)}} >Next</button>}

        </div>

}

export default  Paginator;