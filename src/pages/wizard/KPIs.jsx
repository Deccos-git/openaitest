import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { useFirestore } from "../../firebase/useFirestore";
import { useContext, useState } from "react";
import { db, timestamp } from "../../firebase/config.js"
import { client } from '../../hooks/Client';
import uuid from 'react-uuid';
import { NavLink, Link } from "react-router-dom";
import deleteIcon from '../../images/icons/delete-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import eyeIcon from '../../images/icons/eye-icon.png'
import homeIcon from '../../images/icons/home-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";
import DatapointsOverviewWizard from "../../components/kpis/DatapointsOverviewWizard";
import { useHistory } from "react-router-dom";
import TerrainIcon from '@mui/icons-material/Terrain';

const KPIs = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    ScrollToTop()
    const history = useHistory()
    const menuState = MenuStatus() 

    const kpis = useFirestore('KPIs')
   
    const addKPI = () => {

        const id = uuid()

        db.collection("KPIs")
        .doc()
        .set({
            Title: '',
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            Data: '',
            ID: id,
            Type: ''
        })
        .then(() => {
            db.collection("Wall")
            .doc()
            .set({
                Compagny: client,
                CompagnyID: client,
                Timestamp: timestamp,
                ID: uuid(),
                KPIID: id,
                Type: 'kpi-set'
            })
        })

    }

    const titleHandler = (e) => {
        const value = e.target.value 
        const docid = e.target.dataset.docid 

        db.collection("KPIs")
        .doc(docid)
        .update({
            Title: value
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const deleteKpi = (e) => {

    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>KPI's instellen</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/Projectmanagement`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Projectbeheer</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(19)}
                <NavLink to={`/${client}/Impactclub`} >
                    <div className='step-container'>
                        <p>Community</p>
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
                    <p><b>KPI's helpen je om focus aan te brengen en om overzicht te houden over de meest relevante ontwikkelingen.</b></p>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    <div className='list-container'>
                        <div className='list-top-row-container'>
                                <img src={plusButton} onClick={addKPI} alt="" />
                        </div>
                        <div className='table-container'>
                            <table>
                                <tr>
                                    <th>NAAM</th>
                                    <th>ONDERBOUWING</th>
                                    <th>VERWIJDER</th>
                                </tr>
                                {kpis && kpis.map(item => (
                                    <tr key={item.ID}>
                                        <td>
                                            <input type="text" data-docid={item.docid} onChange={titleHandler} defaultValue={item.Title} />
                                        </td>
                                        <td>
                                            <DatapointsOverviewWizard kpi={item}/>
                                            <div className='list-top-row-container'>
                                                <img onClick={() => history.push(`/${client}/selectdatapoint/${item.ID}/KPIs`)} src={plusButton} alt="" />
                                            </div>
                                        </td>
                                        <td>
                                            <img className='table-delete-icon' data-docid={item.docid} onClick={deleteKpi} src={deleteIcon} alt="" />
                                        </td>
                                    </tr>  
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={eyeIcon} alt="" />
                    <h3>Bekijk</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Je kunt je KPIs hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <TerrainIcon className='icon'/>
                            <NavLink activeClassName='active' to={`/${client}/kpioverview`}>KPIs</NavLink>
                        </div>
                    </div>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={homeIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/Home`}>Home</NavLink>
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
                    <li>
                        Benieuwd naar de impact van andere sociale MKB'ers? Neem eens een kijkje in de <a href="https://deccos.nl/Milestones">Deccos Impactclub</a>.
                    </li>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={feetIcon} alt="" />
                    <h3>Volgende stap</h3>
                </div> 
                <div className='text-section'>
                    <p>In de volgende stap ga je de doelgroepen bepalen.</p>
                    <NavLink to={`/${client}/Targetgroup`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
        </div> 
    </div>
</div>
  )
}

export default KPIs