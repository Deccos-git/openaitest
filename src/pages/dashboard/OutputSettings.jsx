import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { client } from "../../hooks/Client"
import {useFirestore} from "../../firebase/useFirestore"
import { useHistory } from "react-router-dom";
import penIcon from '../../images/icons/pen-icon-white.png'
import { NavLink } from "react-router-dom";
import NoContentNotice from "../../hooks/NoContentNotice";
import ScrollToTop from "../../hooks/ScrollToTop";
import sroiDefault from '../../images/Design/SROI-default.png'

const OutputSettings = () => {
    const menuState = MenuStatus()
    const history = useHistory()
    ScrollToTop()

    const outputs = useFirestore('Outputs')

  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className="page-header">
                <h1>Outputs</h1>
                <div className='edit-icon-header-container'>
                    <NavLink activeClassName='active' to={`/${client}/AddOutput`}>
                        <img src={penIcon} alt="" />
                    </NavLink>
                </div>
            </div>
            <div className='card-container'>
            {outputs && outputs.map(output => (
                <div className="goal-list card" key={output.ID}>
                    <img className="goal-card-banner" src={sroiDefault} alt="" />
                    <div className="goalcard-body-div">
                        <h2>{output.Title}</h2>
                    </div>
                    <div className="button-container">
                        <button className="goal-card-button" data-id={output.ID} onClick={() => history.push(`/${client}/outputdetail/${output.ID}`)} >Bekijk</button>
                    </div>
                </div>
                ))}
            </div>
            {NoContentNotice(outputs, 'AddOutput')}
        </div>
    </div>
  )
}

export default OutputSettings