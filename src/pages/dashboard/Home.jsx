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
            <h1>Test organisaties</h1>
        </div>
        <div className='home-container'>
            <p>Test organisatie toevoegen</p>
        </div>
           
    </div>
</div>
  )
}

export default Home