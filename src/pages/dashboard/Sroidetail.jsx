import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen";
import MenuStatus from "../../hooks/MenuStatus";
import { client, type } from "../../hooks/Client"
import { useState, useEffect, useContext } from 'react'
import ButtonClicked from "../../hooks/ButtonClicked";
import { db, timestamp } from "../../firebase/config.js"
import uuid from 'react-uuid';
import { Auth } from '../../StateManagment/Auth';
import Location from "../../hooks/Location"
import { useFirestoreSROISpecifications, useFirestoreSROIs, useFirestoreSROISets, useFirestoreID } from "../../firebase/useFirestore";
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import { useHistory } from "react-router-dom";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { NavLink, Link } from "react-router-dom";
import plusButton from '../../images/icons/plus-icon.png'
import deleteIcon from '../../images/icons/delete-icon.png'
import Premium from "../../hooks/Premium";
import PremiumNotice from "../../components/common/PremiumNotice";
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import eyeIcon from '../../images/icons/eye-icon.png'
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import sroiIcon from '../../images/icons/sroi-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import shareIcon from '../../images/icons/share-icon-white.png'
import penIcon from '../../images/icons/pen-icon-white.png'

const Sroidetail = () => {
  const [totalBenefits, setTotalBenefits] = useState(0)
  const [totalCosts, setTotalCosts] = useState(0)

  const route = Location()[3]
  const menuState = MenuStatus()
  ScrollToTop()

  const sroiSets = useFirestoreSROISets(route)
  const benefits = useFirestoreSROIs(route, 'benefit')
  const costs = useFirestoreSROIs(route, 'cost')

  // Absolut total benefits

  useEffect(() => {

    const totalArray = []

    benefits && benefits.forEach(item => {
        totalArray.push(item.Amount)
    })

    const sum = totalArray.reduce((partialSum, a) => partialSum + a, 0); 

    setTotalBenefits(sum)

  },[benefits])

  // Absolut total costs

  useEffect(() => {

      const totalArray = []

      costs && costs.forEach(item => {
          totalArray.push(item.Amount)
      })

      const sum = totalArray.reduce((partialSum, a) => partialSum + a, 0); 

      setTotalCosts(sum)

  },[costs])

  const ratio = () => {

    const totalRatio =  totalBenefits/totalCosts

    return totalRatio.toFixed(2)
   }

   const Specifications = ({item}) => {
  
    // All specifications that have this item id as the parentid
    const spec = useFirestoreSROISpecifications(item.ID)

    return(
        <div className='sroi-spec-container'>
            {spec && spec.map(i => (
                <div key={i.ID}>
                    <div className='spec-detail-container'>
                        <SpecificationDetail i={i} costBenefit={item}/>
                    </div>
                    <Specifications item={i} />
                </div>
            ))}
        </div>
    )
}

   const SpecificationDetail = ({i, costBenefit}) => {
    
    const [outputTitle, setOutputTitle] = useState('')

    const history = useHistory()

    // Find title of selected output
    const output = useFirestoreID('Outputs', i.Output ? i.Output : '')

    const findOutputTitle = () => {
        output && output.forEach(o => {
            setOutputTitle(o.Title)
        })
    }
    
    useEffect(() => {
        findOutputTitle()
      }, [output])



      const currency = () => {

        if(i.Currency === 'euro'){
            return '€'
        } else if (i.Currency === 'times'){
            return 'x'
        } else if (i.Currency === 'percentage'){
            return '%'
        } else if (i.Currency === 'text'){
            return ''
        }
      }

    if(i.Currency === 'output'){
        return(
            <div className='specification-title-container'> 
                <p id='output-title'> <u>{outputTitle}</u> </p>
                <div className='activity-meta-title-container sroi-title-container'>
                    <div id='output-amount-container'>
                        <p>{i.Amount}</p>
                    </div>
                </div>
            </div>
        )
    } else if(i.Total === true){
        return(
            <div className='specification-title-container'> 
                <p>{i.Title}</p>
                <div className='activity-meta-title-container sroi-title-container'>
                    <p className='currency'>€</p>
                    <p><b>{costBenefit.Amount}</b></p>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className='specification-title-container'> 
                <p>{i.Title}</p>
                <div className='activity-meta-title-container sroi-title-container'>
                    <div className='currency'>
                        {currency()}
                    </div>
                    <p>{i.Amount}</p>
                </div>
            </div>
        )
    }
}
      
  return (
    <div className="main">
      <LeftSideBar />
      <LeftSideBarFullScreen/>
      <div className="main-container" style={{display: menuState}}>
      {sroiSets && sroiSets.map(item => (
          <div key={item.ID} className='sroi-detail-container'>
            <div className="page-header sroi-detail-page-header">
              <h1>SROI {item.Title}</h1>
              <div className='edit-icon-header-container'>
                  <NavLink activeClassName='active' to={`/${client}/Share`}>
                      <img src={shareIcon} alt="" />
                  </NavLink>
                  <NavLink activeClassName='active' to={`/${client}/AddSROI`}>
                      <img src={penIcon} alt="" />
                  </NavLink>
              </div>
          </div>
              <div className='table-container'> 
                  <table>
                      <tr>
                          <td>
                              <p><b>Totaal</b></p>
                          </td>
                          <td>
                              <p id='ultimate-total'><b>€ {totalBenefits - totalCosts}</b></p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <p><b>Ratio</b></p>
                          </td>
                          <td>
                              <p><b>{ratio()}</b></p>
                          </td>
                      </tr>
                  </table>
              </div>
              <div>
                  <div className='activity-meta-title-container sroi-title-container'>
                      <h3>Baten</h3>
                  </div>
                  <div className='sroi-benefit-container'>
                      {benefits && benefits.map(item => (
                          <div key={item.ID} className='sroi-benefits-detail-container'>
                              <div className='spec-detail-container'>
                                  <div className='specification-title-container'>
                                      <p>{item.Title}</p>
                                  </div>
                                  <td className='activity-meta-title-container sroi-title-container'>
                                      <p>€</p>
                                      <p className='grand-total-amount'>{item.Amount}</p>
                                  </td>
                              </div>
                              <Specifications item={item} />
                          </div>
                      ))}
                  </div>
                  <div className='activity-meta-title-container sroi-title-container'>
                      <h3>Kosten</h3>
                  </div>
                  <div className='sroi-benefit-container'>
                      {costs && costs.map(item => (
                          <div key={item.ID} className='sroi-benefits-detail-container'>
                              <div className='spec-detail-container'>
                                  <div className='specification-title-container'>
                                      <p>{item.Title}</p>
                                  </div>
                                  <td className='activity-meta-title-container sroi-title-container'>
                                      <p>€</p>
                                      <p className='grand-total-amount'>{item.Amount}</p>
                                  </td>
                                  </div>
                              <Specifications item={item} />
                          </div>
                      ))}
                    </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sroidetail