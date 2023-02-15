import React from "react"
import s from "../../CSS/paginate.css"

const Paginate = ({gamesPerPage, totalGames, paginate, currentPage})=>{
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalGames/gamesPerPage); i++) {
        pageNumbers.push(i)
        
    }

    return(
        <div className="containerPaginate">
            
                    {/* {pageNumbers.map((number)=>{
                        return(
                            <div className="numbersPaginate">
                                
                                <p onClick={()=>paginate(number)}>{number}</p>
                            </div>
                            
                        )
                    })} */}
                    <p onClick={()=>paginate(1)} > Primera página</p>
                    <p  onClick={currentPage > 1 ? ()=>paginate(currentPage - 1) : ()=>""}>Anterior</p>
                    <p>Pag: {currentPage}</p>
                    <p onClick={ currentPage < pageNumbers.length ? ()=>paginate(currentPage + 1) : ()=>""}>Siguiente</p>
                    <p onClick={()=>paginate(pageNumbers.length)} > Última página</p>
        </div>
    )
}

export default Paginate