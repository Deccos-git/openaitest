import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import Location from "../../hooks/Location"
import MenuStatus from "../../hooks/MenuStatus";
import { useHistory } from "react-router-dom";
import { client } from "../../hooks/Client"
import { useFirestoreSROISpecifications, useFirestoreSROIs, useFirestore} from "../../firebase/useFirestore";
import penIcon from '../../images/icons/pen-icon-white.png'
import { NavLink } from "react-router-dom";
import Premium from "../../hooks/Premium";
import PremiumNotice from "../../components/common/PremiumNotice";
import NoContentNotice from "../../hooks/NoContentNotice";
import ScrollToTop from "../../hooks/ScrollToTop";
import KpiData from "../../components/kpis/KpiData";

const KpiOverview = () => {

    const menuState = MenuStatus()
    const history = useHistory()
    const premium = Premium() 
    ScrollToTop()

    const kpis = useFirestore('KPIs')

  return (
     <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className='page-header'>
            <h1>KPIs</h1>
                <div className='edit-icon-header-container'>
                    <NavLink activeClassName='active' to={`/${client}/KPIs`}>
                        <img src={penIcon} alt="" />
                    </NavLink>
                </div>
        </div>
        <div className='card-container milestone-card-container' style={{display: premium ? 'flex' : 'none'}}>
            {kpis && kpis.map(item => (
                <div key={item.ID} className='card kpi-container'>
                    <h3>{item.Title}</h3>
                    <KpiData kpi={item}/>
                </div>
            ))}
            
        </div>
        <div style={{display: premium ? 'none' : 'flex'}}>
            <PremiumNotice/>
        </div>
        {NoContentNotice(kpis, 'KPIs')}
    </div>
</div>
  )
}

export default KpiOverview