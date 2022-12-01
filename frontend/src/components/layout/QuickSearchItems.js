import React, { Component } from 'react'
import withNavigateHook from './HOC';
class  QuickSearchItems extends Component {

    handleNavigate = (resId) => {
        const locationId = sessionStorage.getItem('locationId');

        if (locationId){
            this.props.navigation(`/filter?mealtype=${resId}&location=${locationId}`)
        }else{
            this.props.navigation(`/filter?mealtype=${resId}`)
        }
    }
    
  render() {
    const { mealtype, content, image, mealtypeId } = this.props.data;

  
    return (
      <div>
        <div className="itemCont" onClick={() => this.handleNavigate(mealtypeId)}>
              <div className="cardItem d-flex">
                  <img className="img-fluid" src={`/Img/${image}`} width="130px" height="130px" style={{objectFit:'cover'}}lt=""/>
                   <div className="cardContexts p-4">
                      <h4 className="cardheaders">{mealtype}</h4>
                      <p className="text-wrap cardBodys text-muted">{content}</p>
                   </div>
              </div>
          </div>
      </div>
    )
  }
}
export default withNavigateHook(QuickSearchItems)
