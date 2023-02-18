import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen";
import MenuStatus from "../../hooks/MenuStatus";
import { client, type } from "../../hooks/Client"
import { useState, useEffect, useContext } from 'react'
import { db, timestamp } from "../../firebase/config.js"
import uuid from 'react-uuid';
import Location from "../../hooks/Location"
import { 
    useFirestoreSROISpecifications, 
    useFirestoreSROIs, 
    useFirestoreSROISets, 
} from "../../firebase/useFirestore";
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { NavLink, Link } from "react-router-dom";
import plusButton from '../../images/icons/plus-icon.png'
import deleteIcon from '../../images/icons/delete-icon.png'
import eyeIcon from '../../images/icons/eye-icon.png'
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import sroiIcon from '../../images/icons/sroi-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";
import Specifications from "../../components/mkba/Specifications";
import TotalCostsBenefits from "../../components/mkba/TotalCostsBenefits";

const CreateSROI = () => {
    const [saved, setSaved] = useContext(SavedIcon)
    const [totalBenefits, setTotalBenefits] = useState(0)
    const [totalCosts, setTotalCosts] = useState(0)
    const [costBenefitTitle, setCostBenefitTitle] = useState('')
    const [costBenefitDocid, setCostBenefitDocid] = useState('')

    const menuState = MenuStatus()
    const route = Location()[3]
    const compagny = Location()[1]
    ScrollToTop()

    const sroiSets = useFirestoreSROISets(route)
    const benefits = useFirestoreSROIs(route, 'benefit')
    const costs = useFirestoreSROIs(route, 'cost')

    // Absolut total benefits
    const absoluteTotalBenefits = () => {
        const totalArray = []

        benefits && benefits.forEach(item => {
            totalArray.push(item.Amount)
        })

        const sum = totalArray.reduce((partialSum, a) => partialSum + a, 0); 

        setTotalBenefits(Number((Math.round(sum * 100) / 100).toFixed(2)))
    }

    useEffect(() => {
        absoluteTotalBenefits()
    },[benefits])

    // Absolut total costs
    const absoluteTotalCosts = () => {
        const totalArray = []

        costs && costs.forEach(item => {
            totalArray.push(item.Amount)
        })

        const sum = totalArray.reduce((partialSum, a) => partialSum + a, 0); 

        setTotalCosts(Number((Math.round(sum * 100) / 100).toFixed(2)))
    }

    useEffect(() => {
        absoluteTotalCosts()
    },[costs])
 
    // Update title

   const titleHandler = (e) => {

    const value = e.target.value 
    const docid = e.target.dataset.docid

    db.collection('SROISets')
    .doc(docid)
    .update({
        Title: value
    })
    .then(() => {
        setSaved('flex')
     })
   }

    // Add a benefit
   const addBenefit = () => {

        db.collection('SROIs')
        .doc()
        .set({
            Title: '',
            Currency: 'euro',
            Amount: Number(0),
            ParentID: '',
            Type: 'benefit',
            SROISet: route,
            ID: uuid(),
            CompagnyID: compagny
        })

   }

   // Add a cost
   const addCost = () => {

    db.collection('SROIs')
    .doc()
    .set({
        Title: '',
        Currency: 'euro',
        Amount: Number(0),
        ParentID: '',
        Type: 'cost',
        SROISet: route,
        ID: uuid(),
        CompagnyID: compagny
    })

   }

   // Update the title of the total cost/benefit
   const costBenefitTitleHandler = (e) => {
        const value = e.target.value 
        const docid = e.target.dataset.docid 

        setCostBenefitTitle(value)
        setCostBenefitDocid(docid)

   }

   // Save the title of the total cost/benefit
   const saveCostBenefitTitle = () => {
        db.collection('SROIs')
        .doc(costBenefitDocid)
        .update({
            Title: costBenefitTitle,
        })
        .then(() => {
            setCostBenefitTitle('')
        })
   }

   // Add a specification
   const addSpecification = (e) => {
       
    const parentID = e.target.dataset.id

        db.collection('SROIs')
        .doc()
        .set({
            Title: '',
            Currency: 'euro',
            Amount: Number(0),
            ParentID: parentID,
            Type: '',
            SROISet: route,
            ID: uuid(),
            CompagnyID: compagny,
            Timestamp: timestamp
        })

    }

    // Delete specification
    const deleteCostBenefit = (e) => {

        const docid = e.target.dataset.docid 

        db.collection('SROIs')
        .doc(docid)
        .delete()

    }

   const ratio = () => {

    const totalRatio =  totalBenefits/totalCosts

    return totalRatio.toFixed(2)
   }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>MKBA aanpassen</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/AddSROI`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>MKBA's</p>
                    </div>
                </NavLink>  
            </div>
        </div>
        <div className='profile profile-auth-profile'>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={capIcon} alt="" />
                    <h3>Uitleg</h3>
                </div> 
                <div className='text-section'>
                   <p><b>
                        Pas hier je MKBA berekening aan.
                    </b></p>
                </div>
            </div>
        <div>
        <div className='activity-meta-title-container'>
            <img src={rocketIcon} alt="" />
            <h3>Aan de slag</h3>
        </div> 
        <div className='text-section'>
            {sroiSets && sroiSets.map(item => (
                <div key={item.ID}>
                    <div>
                        <h2>Titel</h2>
                        <input type="text" placeholder='Schrijf hier de titel van de SROI' defaultValue={item.Title} data-docid={item.docid} onChange={titleHandler}  />
                    </div>
                    <h2>Totaal</h2>
                    <div className='table-container'> 
                        <table>
                            <tr>
                                <td>
                                    <p><b>Totaal</b></p>
                                </td>
                                <td>
                                    <p id='ultimate-total'><b>€ {(totalBenefits - totalCosts).toFixed(2)}</b></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p><b>SROI</b></p>
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
                            <img src={plusButton} alt="plus icon" onClick={addBenefit} />
                        </div>
                        <div className='sroi-benefit-container'>
                            {benefits && benefits.map(item => (
                                <div key={item.ID} className='sroi-benefits-detail-container'>
                                    <div className='spec-detail-container'>
                                        <div className='specification-title-container'>
                                            <input type="text" defaultValue={item.Title} placeholder='Schrijf hier de titel' data-docid={item.docid} onChange={costBenefitTitleHandler} />
                                            <p className='sroi-save-amount-button' style={{display: costBenefitTitle === '' ? 'none' : 'block'}} onClick={saveCostBenefitTitle}>Opslaan</p>
                                        </div>
                                        <TotalCostsBenefits item={item}/>
                                        <img src={plusButton} alt="plus icon" className='table-delete-icon' data-id={item.ID} onClick={addSpecification}/>
                                        <img src={deleteIcon} alt="delete icon" className='table-delete-icon' data-docid={item.docid} onClick={deleteCostBenefit}/>
                                    </div>
                                    <Specifications item={item} />
                                </div>
                            ))}
                        </div>
                        <div className='activity-meta-title-container sroi-title-container'>
                            <h3>Kosten</h3>
                            <img src={plusButton} alt="plus icon" onClick={addCost} />
                        </div>
                        <div className='sroi-benefit-container'>
                            {costs && costs.map(item => (
                                <div key={item.ID} className='sroi-benefits-detail-container'>
                                    <div className='spec-detail-container'>
                                        <div className='specification-title-container'>
                                            <input type="text" defaultValue={item.Title} placeholder='Schrijf hier de titel' data-docid={item.docid} onChange={costBenefitTitleHandler} />
                                            <p className='sroi-save-amount-button' style={{display: costBenefitTitle === '' ? 'none' : 'block'}} onClick={saveCostBenefitTitle}>Opslaan</p>
                                        </div>
                                        <TotalCostsBenefits item={item}/>
                                            <img src={plusButton} alt="plus icon" className='table-delete-icon' data-id={item.ID} onClick={addSpecification} />
                                            <img src={deleteIcon} alt="delete icon" className='table-delete-icon' data-docid={item.docid} onClick={deleteCostBenefit}/>
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
            <div>
                <div className='activity-meta-title-container'>
                    <img src={eyeIcon} alt="" />
                    <h3>Bekijk</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Je kunt je de MKBA's hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={sroiIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/SROI`}>MKBA's</NavLink>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={dashboardIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/ImpactProgress`}>Dashboard</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={bulbIcon} alt="" />
                    <h3>Tips</h3>
                </div> 
                <div className='text-section'>
                    <ol>
                        <li>Benieuwd naar de impact van andere sociale MKB'ers? Neem eens een kijkje in de <a href="https://deccos.nl/Milestones">Deccos Impactclub</a>.</li>
                    </ol>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={feetIcon} alt="" />
                    <h3>Volgende stap</h3>
                </div> 
                <div className='text-section'>
                    <p>In de volgende stap ga je mijlpalen formuleren.</p>
                    <NavLink to={`/${client}/MeasureOutput`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default CreateSROI