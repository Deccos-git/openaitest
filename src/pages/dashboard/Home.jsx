import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { useFirestore } from "../../firebase/useFirestore";
import ScrollToTop from "../../hooks/ScrollToTop";
import KpiData from "../../components/kpis/KpiData";
import { useContext } from 'react';
import { Auth } from '../../StateManagment/Auth';
import penIcon from '../../images/icons/pen-icon.png'
import { client, type } from "../../hooks/Client"
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TerrainIcon from '@mui/icons-material/Terrain';
import { style } from "@mui/system";

const Home = () => {
    const [authO] = useContext(Auth)

    const kpis = useFirestore('KPIs')
    const goals = useFirestore('Goals')
    const activities = useFirestore('Activities')
    const outputs = useFirestore('Outputs')
    const effects = useFirestore('OutputEffects')
    const researches = useFirestore('Research')
    const personas = useFirestore('Personas')
    const mkbas = useFirestore('SROISets')

    const menuState = MenuStatus()
    ScrollToTop()
    const history = useHistory()
   
  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className='page-header'>
            <h1><span>👋 </span> Welkom, {authO.ForName}.</h1>
        </div>
        <div className='home-container'>
            {/* <div className='title-edit-container'>
                <RotateRightIcon className='icon'/>
                <h2>Voortgang</h2>
            </div>
            <ProfileCompleteness/> */}
            <div className='home-stats-container'>
                <div className='home-stat-container' onClick={() => history.push(`/${client}/Goals`)}>
                    <h3>Impactdoelen</h3>
                    <p>{goals.length}</p>
                </div>
                <div className='home-stat-container' onClick={() => history.push(`/${client}/Activities`)}>
                    <h3>Activiteiten</h3>
                    <p>{activities.length}</p>
                </div>
                <div className='home-stat-container' onClick={() => history.push(`/${client}/OutputSettings`)}>
                    <h3>Outputs</h3>
                    <p>{outputs.length}</p>
                </div>
                {/* <div className='home-stat-container' onClick={() => history.push(`/${client}/OutputSettings`)}>
                    <h3>Effecten</h3>
                    <p>{effects.length}</p>
                </div> */}
                <div className='home-stat-container' onClick={() => history.push(`/${client}/ResearchSettings`)}>
                    <h3>Onderzoeken</h3>
                    <p>{researches.length}</p>
                </div>
                <div className='home-stat-container' onClick={() => history.push(`/${client}/personas`)}>
                    <h3>Personas</h3>
                    <p>{personas.length}</p>
                </div>
                <div className='home-stat-container' onClick={() => history.push(`/${client}/SROI`)}>
                    <h3>MKBAs</h3>
                    <p>{mkbas.length}</p>
                </div>

            </div>
            <div className='title-edit-container'>
                <TerrainIcon className='icon'/>
                <h2>KPI's</h2>
                <NavLink activeClassName='active' to={`/${client}/kpis`}>
                    <img src={penIcon} alt="" />
                </NavLink>
            </div>
            <div className='card-container kpi-home-container'>
                {kpis && kpis.map(item => (
                    <div key={item.ID} className={`card kpi-container`}>
                        <h3>{item.Title}</h3>
                        <KpiData kpi={item}s/>
                    </div>
                ))}
            </div>
            <div className='title-edit-container'>
                {/* <FormatListBulletedIcon className='icon'/> */}
                {/* <h2>Taken</h2> */}
            </div>
        </div>
    </div>
</div>
  )
}

export default Home