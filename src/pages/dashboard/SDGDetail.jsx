import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import penIcon from '../../images/icons/pen-icon-white.png'
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import NoContentNotice from "../../hooks/NoContentNotice";
import ScrollToTop from "../../hooks/ScrollToTop";
import { useFirestore, useFirestoreSDGsSelectedMeta } from "../../firebase/useFirestore";

const SDGDetail = () => {

    const menuState = MenuStatus()
    ScrollToTop()

    const sdgs = useFirestore('SDGsSelected')

    const SDGs = ({sdg}) => {

        const SDGMeta = useFirestoreSDGsSelectedMeta(sdg.SDG)

        return(
            <>
                {SDGMeta && SDGMeta.map(meta => (
                    <div className='card sdg-card'>
                        <p>{meta.Position}</p>
                        <img src={meta.Banner} alt="" />
                        <h3>{meta.SDG}</h3>
                    </div>
                ))}
            </>
        )

    }


  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>SDG's</h1>
            <div className='edit-icon-header-container'>
                <NavLink activeClassName='active' to={`/${client}/SDGs`}>
                    <img src={penIcon} alt="" />
                </NavLink>
            </div>
        </div>
        <div className='card-container'>
            {sdgs && sdgs.map(sdg => (
                <SDGs sdg={sdg}/>
            ))}
        </div>
        {NoContentNotice(sdgs, 'Introduction')}
    </div>
</div>
  )
}

export default SDGDetail