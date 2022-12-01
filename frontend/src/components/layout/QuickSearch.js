import React, { Component } from 'react'
import QuickSearchItems from './QuickSearchItems'

export default class QuickSearch extends Component {
  render() {
    const {mealtypes}=this.props
    return (
      <div> <section  className="container-fluid my-5 ">
      <div className="sectionHeaders container text-md-center text-lg-start">
          <h1 className="bodyHeaders">Quick Searches</h1>
          <p className="bodyContents">Discover restaurants by type of meal</p>
      </div>
      <div className="Cont d-flex flex-wrap  justify-content-center align-items-center gap-5  mt-4">
           {
            mealtypes?.map((item)=>{
                return(
                    <QuickSearchItems data = {item}  key={item.mealtypeId}/>
                )
            })
           }

         
      </div>
  </section></div>
    )
  }
}
