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
import { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import { db, timestamp } from "../../firebase/config.js"
import { useHistory } from "react-router-dom";
import deleteIcon from '../../images/icons/delete-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import uuid from "react-uuid";
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import eyeIcon from '../../images/icons/eye-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";

const AddPersonas = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const personas = useFirestore('Personas')

    const menuState = MenuStatus()
    ScrollToTop()
    const id = uuid()
    const history = useHistory()

    const addPersona = () => {

        db.collection('Personas')
        .doc()
        .set({
            Name: '',
            ID: id,
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
        })
        .then(() => {
            db.collection("Wall")
            .doc()
            .set({
                Compagny: client,
                CompagnyID: client,
                Timestamp: timestamp,
                ID: uuid(),
                PersonaID: id,
                Type: 'persona-set'
            })
        })

    }

    const nameHandler = (e) => {

        const docid = e.target.dataset.docid
        const value = e.target.value

        db.collection('Personas')
        .doc(docid)
        .update({
            Name: value
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const deletePersona = (e) => {

        const docid = e.target.dataset.docid

        db.collection('Personas')
        .doc(docid)
        .delete()
    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Personas</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/AddSROI`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>MKBA's</p>
                    </div>
                </NavLink>  
                {ImpactGuideMenu(13)}
                <NavLink to={`/${client}/MeasureOutput`} >
                    <div className='step-container'>
                        <p>Mijlpalen stellen</p>
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
                    <p><b>Personas brengen je impact tot leven.</b></p>
                    <p>Aan de hand van personas kun je jullie impact op individueel niveau laten zien. Laat zien welk verschil jullie maken in het leven van de jullie doelgroep.</p>
                    
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    <div>
                        <p><b>Beheer je personas</b></p>
                        <div>
                            <div className='list-container'>
                                <div className='list-top-row-container'>
                                    <img src={plusButton} onClick={addPersona} alt="" />
                                </div>
                                <div className='table-container'>
                                    <table>
                                        <tr>
                                            <th>TITEL</th>
                                            <th>AANPASSEN</th>
                                            <th>VERWIJDER</th>
                                        </tr>
                                        {personas && personas.map(item => (
                                            <tr key={item.ID}>
                                                <td>
                                                    <input type="text" defaultValue={item.Name} data-docid={item.docid} placeholder='Noteer hier de naam van de persona' onChange={nameHandler}/>
                                                </td>
                                                <td>
                                                    <img className='table-delete-icon' data-docid={item.docid} onClick={() => history.push(`/${client}/editpersona/${item.ID}`)} src={eyeIcon} alt="" />
                                                </td>
                                                <td>
                                                    <img className='table-delete-icon' data-docid={item.docid} onClick={deletePersona} src={deleteIcon} alt="" />
                                                </td>
                                            </tr>
                                    ))}
                                    </table>
                                </div>
                            </div>
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
                    <p><b>Je kunt je personas hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={dashboardIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/personas`}>Personas</NavLink>
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
                <p>In de volgende stap ga je mijlpalen stellen voor je outputs.</p>
                <NavLink to={`/${client}/MeasureOutput`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
        </div> 
    </div>
</div>
  )
}

export default AddPersonas