import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen";
import MenuStatus from "../../hooks/MenuStatus";
import { client } from "../../hooks/Client"
import { useState, useEffect, useContext } from 'react'
import { db, timestamp } from "../../firebase/config.js"
import uuid from 'react-uuid';
import { useFirestore } from "../../firebase/useFirestore";
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
import { SavedIcon } from "../../StateManagment/SavedIcon";

const AddSROI = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [admin, setAdmin] = useState('none')

    const menuState = MenuStatus()
    const premium = Premium() 
    const history = useHistory()
    ScrollToTop()

    const sroiSets = useFirestore('SROISets')

    const addSROI = (e) => {

        const id = uuid()

        db.collection('SROISets')
        .doc()
        .set({
            ID: id,
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            Title: ''
        })
        .then(() => {
            db.collection("Wall")
            .doc()
            .set({
                Compagny: client,
                CompagnyID: client,
                Timestamp: timestamp,
                ID: uuid(),
                SROIID: id,
                Type: 'mkba-set'
            })
        })
    }

    const deleteSROI = (e) => {
        const docid = e.target.dataset.docid

        db.collection('SROISets')
        .doc(docid)
        .delete()
    }

    const viewSROI = (e) => {

        const id = e.target.dataset.id

        history.push(`/${client}/CreateSROI/${id}`)
    }

    const titleHandler = (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.value

        db.collection('SROISets')
        .doc(docid)
        .update({
            Title: value
        })
        .then(
            setSaved('flex')
        )
    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>MKBA</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/OutputEffects`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Effecten van output</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(12)}
                <NavLink to={`/${client}/addpersonas`} >
                    <div className='step-container'>
                        <p>Personas</p>
                        <img src={arrowRight} alt="" />
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
                        MKBA staat voor Maatschappelijke Kosten Baten Analyse. Dit is een methodiek om jullie impact financieel door te rekenen. 
                    </b></p>
                </div>
            </div>
        <div>
        <div className='activity-meta-title-container'>
            <img src={rocketIcon} alt="" />
            <h3>Aan de slag</h3>
        </div> 
        <div className='text-section'>
            <div style={{display: premium ? 'block' : 'none'}}>
            <div className='table-container'>
                <p><b>MKBA's</b></p>
                <div className='list-top-row-container' style={{display: admin ? 'block' : 'none'}}>
                    <img src={plusButton} alt="" onClick={addSROI}/>
                </div>
                <table>
                    <tr>
                        <th>TITEL</th>
                        <th style={{display: admin ? 'block' : 'none'}}>BEKIJK</th>
                        <th>VERWIJDER</th>
                    </tr>
                    {sroiSets && sroiSets.map(item => (
                        <tr key={item.ID}>
                            <td>
                                <input type="text" data-docid={item.docid} defaultValue={item.Title} placeholder='Title' onChange={titleHandler}  />
                            </td>
                            <td style={{display: admin ? 'table-cell' : 'none'}}>
                                <img className='table-delete-icon' src={eyeIcon} alt="eye icon" data-id={item.ID}  onClick={viewSROI} />
                            </td>
                            <td>
                                <img className='table-delete-icon' src={deleteIcon} alt="delete icon" data-docid={item.docid} onClick={deleteSROI}/>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            </div>
            <div style={{display: premium ? 'none' : 'flex'}}>
                <PremiumNotice/>
            </div>
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

export default AddSROI