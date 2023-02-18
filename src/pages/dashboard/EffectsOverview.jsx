import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { client } from "../../hooks/Client"
import {useFirestoreGeneral} from "../../firebase/useFirestore"
import Location from "../../hooks/Location"
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import growIcon from '../../images/icons/grow-icon.png'
import researchIcon from '../../images/icons/research-icon.png'
import resultsIcon from '../../images/icons/results-icon.png'
import activityIcon from '../../images/icons/activity-icon.png'
import penIcon from '../../images/icons/pen-icon-white.png'
import { NavLink } from "react-router-dom";
import ScrollToTop from "../../hooks/ScrollToTop";
import EffectData from '../../components/effects/EffectData';
import SubEffectDashboard from '../../components/effects/SubEffectDashboard'

const EffectsOverview = () => {

    const menuState = MenuStatus()
    const history = useHistory()
    ScrollToTop()

    const effects = useFirestoreGeneral('OutputEffects', 'Parent', '')

    const positiveNegative = (posNeg) => {

        if(posNeg === 'positive'){
            return 'Positief'
        } else {
            return 'Negatief'
        }
    }

    const type = (type) => {

        if(type === 'targetgroup'){
            return 'Impact op doelgroep'
        } else {
            return 'Impact op maatschappij'
        }
    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Effecten</h1>
            <div className='edit-icon-header-container'>
                <NavLink activeClassName='active' to={`/${client}/AddOutput`}>
                    <img src={penIcon} alt="" />
                </NavLink>
            </div>
        </div>
        <div className='card-container'>
            {effects && effects.map(effect => (
                <div className='output-effects-container output-effects-dashborad-container' key={effect.ID} >
                    <div className='output-effects-inner-container'>
                        <div className='output-detail-container'>
                            <p><b>Effect</b></p>
                            <p><i>{effect.Effect}</i></p>
                        </div>
                        <div className='output-effects-meta-container'>
                            <div className='effects-meta-item-container'>
                                <p><b>Positief/negatief</b></p>
                                <p>{positiveNegative(effect.PosNeg)}</p> 
                            </div>
                            <div className='effects-meta-item-container'>
                                <p><b> Type</b></p>
                                <p>{type(effect.Type)}</p>
                            </div>
                            <div className='effects-meta-datapoints-container'>
                                <p><b> Onderbouwing</b></p>
                                <EffectData effect={effect}/>
                            </div>
                        </div>

                    </div>
                    <SubEffectDashboard id={effect.ID}/>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default EffectsOverview