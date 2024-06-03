import React from 'react'
import {useState} from 'react'

const SearchBox = (props) => {
    
    const [searchBox, setSearchBox] = useState("");
    
    return (
        <section className={"search-box-container"}>

            <h4 className="section-title">Buscar voucher por percentual</h4>

            <form action="" className="grid grid-col-1">
                <input placeholder="Insira um percentual de desconto" className="input-box-max" type="text" id="filter"
                value={searchBox} onChange={(event)=>{
                    setSearchBox(event.target.value)
                    props.onFilterVouchers(event.target.value)
                }}/>
            </form>
    
        </section>
    )
}

export default SearchBox
