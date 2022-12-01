import React, { Component } from 'react'
import Header from '../layout/Header'
import '../styles/Filter.css'
import axios from 'axios';
import withNavigateHook from '../layout/HOC';
import FilterRestuarants from '../layout/FilterRestuarants';
import NotFound from '../layout/NotFound';

const queryString = require('query-string');
 class Filter extends Component {
  constructor() {
    super();
    this.state = {
        restaurant: [],
        locations:[], 
        mealtype: undefined,
        location: undefined,
        cuisine: [],
        lcost: undefined,
        hcost: undefined,
        sort: 1,
        page: 1,
       pageCount:[],
       headerLocation:undefined,
       headerMealType:undefined
    }
}
componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { mealtype, location } = qs;
    const {page,pageCount,headerMealType,headerLocation}= this.state


    const filterObj = {
        mealtype: mealtype,
        location: location,
        page
    };

    axios({
        url: 'http://localhost:4000/filter',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
    })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants, mealtype, location, pageCount:res.data.pageCountArr,headerLocation:res.data.headerLocation,headerMealType:res.data.headerMealType})
        })
        .catch(err => console.log(err))

        axios({
          url: 'http://localhost:4000/locations',
          method: 'GET',
          headers: { 'Content-Type': 'application/JSON'}
      })
      .then(res => {
          this.setState({ locations: res.data.Locations})
      })
      .catch(err => console.log(err))

      }
      
      handleSortChange = (sort) => {
        const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: location,
            lcost,
            hcost,
            page,
            sort
        };
        axios({
            url: 'http://localhost:4000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, sort })
            })
            .catch(err => console.log(err))
    }

    handleCostChange = (lcost, hcost) => {
        const { cuisine, mealtype, location, sort, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: location,
            lcost,
            hcost,
            page,
            sort
        };
        axios({
            url: 'http://localhost:4000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, lcost, hcost })
            })
            .catch(err => console.log(err))
    }
    handleCusineChange = (e) => {
      const { mealtype, location, sort, page,lcost,hcost,cuisine} = this.state;
        const {value,checked}=e.target;
        console.log(value,checked);
         if(checked) {
          this.setState({ cuisine:value})
         }
         else{
            console.log(cuisine);
           this.setState({cuisine:cuisine})
         }


         console.log(cuisine);
         if (cuisine.indexOf(value) == -1) {
          cuisine.push(value);
      }
      else {
          var index = cuisine.indexOf(value);
          cuisine.splice(index, 1);
      }


        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine,
            location: location,
            lcost,
            hcost,
            page,
            sort
        };
        axios({
            url: 'http://localhost:4000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, cuisine:cuisine })
            })
            .catch(err => console.log(err))
    }
    
    handleLocationChange = (event) => {
        const location = event.target.value;
        const { mealtype, cuisine, sort, lcost, hcost, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: location,
            lcost,
            hcost,
            page,
            sort
        };
        axios({
            url: 'http://localhost:4000/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, location,headerLocation:res.data.headerLocation,headerMealType:res.data.headerMealType})
            })
            .catch(err => console.log(err))
    }
      handleNavigate = (resId) => {
        this.props.navigation(`/details?restaurant=${resId}`)
    }
  handlePageChange=(pageNumber)=>{
    const { mealtype, cuisine, sort, lcost, hcost,location,page} = this.state;

console.log(pageNumber);
      
      const filterObj = {
        mealtype: mealtype,
        cuisine: cuisine.length != 0 ? cuisine : undefined,
        location: location,
        lcost,
        hcost,
        page:pageNumber,
        sort
    };
    
    axios({
        url: 'http://localhost:4000/filter',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: filterObj
    })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants,page:pageNumber})
        })
        .catch(err => console.log(err))
  }
  render() {
    const {restaurant,locations,pageCount,page,headerLocation,headerMealType}=this.state
    return (
      <div> 
  
      <section className="container">

   
      <div className="contanier mt-4">
      {
       ( headerMealType!==undefined && headerLocation!==undefined )?( <h1 className="titles">{`${headerMealType} Places in ${headerLocation}`}</h1>):(<h1 className="titles">{`${headerMealType} Places`}</h1>)
      }
    
      </div>


    <div className="row">
    
      <div  className="col-lg-3 col-md-4">
        <div className="container  filterContainer">
          <div className="container filterContent">
                  <div className="filterHeader pt-4">
                      Filters
                  </div>
                  <div className="location mt-4">
                      <p>Location</p>
                      <div className="locationContent">
                      <select onClick={this.handleLocationChange}>
                          <option selected  value={0} disabled>Select Location</option>
                          { locations?.map((item)=>{
                         return(
                          <option key={item.locationId} value={item.locationId} >
                                        {`${item.location}`}
                                    </option>
                         )
                       })

                       }
                      </select>
                  </div>
                  </div>
                  <div className="cusine mt-4 ">
                      <p>Cusine</p>
                      <div className="CusineContent ">
                          <div className="form-check checkbox">
                              <input className="form-check-input" type="checkbox" id="flexCheckDefaultt1" value={1}  onChange={this.handleCusineChange}/>
                              <label className="form-check-label"  for="flexRadioDefaultt1" >
                                North Indian
                              </label>
                            </div>
                            <div className="form-check checkbox">
                              <input className="form-check-input" type="checkbox"  value={2} id="flexRadioDefaultt2" onChange={this.handleCusineChange} />
                              <label className="form-check-label" for="flexRadioDefaultt2">
                               South Indian
                              </label>
                            </div>
                            <div className="form-check checkbox">
                              <input className="form-check-input" type="checkbox" value={3} id="flexCheckDefaultt3" onChange={this.handleCusineChange} />
                              <label className="form-check-label"  for="flexRadioDefaultt3" >
                               Chinese
                              </label>
                            </div>
                            <div className="form-check checkbox">
                              <input className="form-check-input" type="checkbox" value={4}  id="flexCheckDefaultt4" onChange={this.handleCusineChange}/>
                              <label className="form-check-label"   for="flexRadioDefaultt4">
                               Fast Food
                              </label>
                            </div>
                            <div className="form-check checkbox">
                              <input className="form-check-input" type="checkbox" value={5}  id="flexCheckDefaultt5"onChange={this.handleCusineChange}/>
                              <label className="form-check-label"   for="flexRadioDefaultt5">
                               Street Food
                              </label>
                            </div>
                      </div>

                      <div className="costContainer mt-4 ">
                          <p>Cost For Two</p>
                          <div className="costContent">
                              <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={() => this.handleCostChange(1, 500)}/>
                                  <label className="form-check-label" for="flexRadioDefault1">
                                    less than 500
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => this.handleCostChange(500, 1000)}/>
                                  <label className="form-check-label" for="flexRadioDefault2">
                                    500 to 1000
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={() => this.handleCostChange(1000, 1500)}/>
                                  <label className="form-check-label" for="flexRadioDefault3">
                                   1000 to 1500
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onChange={() => this.handleCostChange(1500, 2000)}/>
                                  <label className="form-check-label" for="flexRadioDefault4">
                                   1500 to 2000
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" onChange={() => this.handleCostChange(2000, 5000)}/>
                                  <label className="form-check-label" for="flexRadioDefault5">
                                   2000+
                                  </label>
                                </div>
                          </div>

                      </div>

                      <div className="sortContainer mt-4 ">
                          <p>Sort</p>
                          <div className="sortContent">
                              <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" onChange={() => this.handleSortChange(1)}/>
                                  <label className="form-check-label" for="flexRadioDefault6" >
                                   Price low to high
                                  </label>
                                </div>
                                <div className="form-check ">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault7" onChange={() => this.handleSortChange(-1)}/>
                                  <label className="form-check-label mb-4" for="flexRadioDefault7">
                                   Price high to low
                                  </label>
                                </div>

                          </div>
                      </div>


                  </div>
          
          </div>
         
        </div>
      </div>

    
      <div className=" col-lg-9 col-md-8 container d-flex flex-column gap-4 w-60">
      
      {restaurant.length !=0?restaurant.map((item)=>(
        <FilterRestuarants item={item} key={item._id} handleNavigate={this.handleNavigate}/>
      )):(<NotFound/>)}
       
          <div className="PaginationCont d-flex container align-items-center justify-content-center">
          <nav aria-label="Page navigation example" className="Pagination">
            <ul className="pagination gap-2">
              <li className="page-item">
               
                  <button className="page-link h5" onClick={()=>this.handlePageChange(page-1)} aria-label="Previous" aria-hidden="true">&laquo;</button>
              
              </li>
              {pageCount.length > 0 &&  pageCount.map((item)=>{
                return(<li className="page-item"><button className="page-link" key={item} onClick={(e)=>this.handlePageChange(e.target.value)} value={item}>{item}</button></li>)
              })}
           
              <li className="page-item">
           
                  <button  className="page-link h5" onClick={()=>this.handlePageChange(page+1)} aria-hidden="true">&raquo;</button>
              
              </li>
            </ul>
          </nav>
        </div>
  
    </div>
    </div>
   
  </section></div>
    )
  }
}

export default withNavigateHook(Filter)
