import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import { useFirestore, useFirestoreID } from "../../firebase/useFirestore";
import { useState,  useContext } from "react";
import { NavLink} from "react-router-dom";
import { client } from '../../hooks/Client';
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import eyeIcon from '../../images/icons/eye-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";
import Location from "../../hooks/Location"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EuroIcon from '@mui/icons-material/Euro';
import TerrainIcon from '@mui/icons-material/Terrain';
import resultsIcon from '../../images/icons/results-icon.png'
import DatapointsResearchDetail from "../../components/datapoints/DatapointsResearchDetail";
import SaveDatapoint from "../../components/datapoints/SaveDatapoint";

const SelectDatapoints = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const [showResearchDetail, setShowResearchDetail] = useState('')

    const id = Location()[3]
    const type = Location()[4]

    const outputs = useFirestore('Outputs')
    const researches = useFirestore('Research')
    const kpis = useFirestoreID('KPIs', id)
    const effects = useFirestoreID('OutputEffects', id)


    const menuState = MenuStatus()
    ScrollToTop()

    const typeName = () => {
        if(type === 'KPIs'){
            return 'KPI'
        } else if(type === 'OutputEffects'){
            return 'effect'
        }
    }
   
    const back = () => {
        if(type === 'KPIs'){
            return 'KPIs'
        } else if(type === 'OutputEffects'){
            return 'Effecten'
        }
    }

    const selectOutput = (e) => {

    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Selecteer een onderbouwing</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/${type}`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>{back()}</p>
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
                    Om KPI's, erffecten en onderdelen uit MKBA's te onderbouwen kunnen datapunten worden geselecteerd. Datapunten zijn cijfers die 
                    zijn achterhaald aan de hand van onderzoeken die je hebt uitgevoerd of door outputs (resultaten) bij te houden.
                    </b></p>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    <div className='selected-kpi-effect-mkba-title-container'>
                        <p>Selecteer een datapunt voor {typeName()}:&nbsp;</p>
                        {kpis && kpis.map(item => (
                        <h2 key={item.ID}>{item.Title}</h2>
                        ))}
                        {effects && effects.map(item => (
                            <h2 key={item.ID}>{item.Effect}</h2>
                        ))}
                    </div>
                    <div className='datapoint-container'>
                        <h3>Outputs</h3>
                        {outputs && outputs.map(item => (
                            <div key={item.ID} className='datapoint-research-option-container'>
                                <p>{item.Title}</p>
                                <SaveDatapoint title={item.Title} type={'output'} output={item}/>
                            </div>
                        ))}
                        <h3>Onderzoeken</h3>
                        {researches && researches.map(item => (
                            <div>
                                <div key={item.ID} className='datapoint-research-option-container' onClick={() => showResearchDetail === item.ID ? setShowResearchDetail('') : setShowResearchDetail(item.ID)}>
                                    <p key={item.ID}>{item.Title}</p>
                                    <KeyboardArrowDownIcon/>
                                </div>
                                <div style={{display: showResearchDetail === item.ID ? 'flex' : 'none'}}>
                                    <DatapointsResearchDetail researchID={item.ID} />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={eyeIcon} alt="" />
                    <h3>Bekijk</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Je kunt je onderbouwingen hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={dashboardIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}`}>Home</NavLink>
                        </div>
                        <div className='activity-meta-title-container'>
                            <TerrainIcon className='icon'/>
                            <NavLink activeClassName='active' to={`/${client}/kpioverview`}>KPIs</NavLink>
                        </div>
                        <div className='activity-meta-title-container'>
                            <img src={resultsIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/OutputSettings`}>Effecten</NavLink>
                        </div>
                        <div className='activity-meta-title-container'>
                            <EuroIcon className='icon'/>
                            <NavLink activeClassName='active' to={`/${client}/SROI`}>MKBAs</NavLink>
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
        </div> 
    </div>
</div>
  )
}

export default SelectDatapoints