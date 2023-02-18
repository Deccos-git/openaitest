import LeftSideBarAuthProfile from "../../components/LeftSideBarAuthProfile";
import LeftSideBarAuthProfileFullScreen from "../../components/LeftSideBarAuthProfileFullScreen";
import MenuStatus from "../../hooks/MenuStatus";
import { client } from '../../hooks/Client';
import ScrollToTop from "../../hooks/ScrollToTop";

const Share = () => {
    
    const menuState = MenuStatus()
    ScrollToTop()

    return (
        <div className="main">
            <LeftSideBarAuthProfile />
            <LeftSideBarAuthProfileFullScreen/>
            <div className="main-container" style={{display: menuState}}>
                <div className="profile-inner-container">
                    <div className=" divider card-header">
                        <h1>Delen</h1>
                        <p>Deel je live impact rechtstreeks op je eigen website</p>
                    </div>
                    <div className="divider">
                        <h2>Dashboard</h2>
                        <p>Insluiten</p>
                        <div className='share-container'>
                            <p>{`<iframe src='https://deccos.nl/embed/dashboard/${client}' title="dashboard" width="560" height="315"></iframe>`}</p>
                        </div>
                        <p>Link</p>
                        <div className='share-container'>
                            <p>{`https://deccos.nl/OrganisationDetail/${client}`}</p>
                        </div>
                    </div>
                    {/* <div className="divider">
                        <h2>Stakeholders</h2>
                        <p>Insluiten</p>
                        <div className='share-container'>
                            <p>{`<iframe src='https://deccos.nl/embed/stakeholders/${client}' title="stakeholders" width="560" height="315"></iframe>`}</p>
                        </div>
                        <p>Link</p>
                        <div className='share-container'>
                            <p>{`https://deccos.nl/Stakeholders/${client}`}</p>
                        </div>
                    </div> */}
                    <div className="divider">
                        <h2>Theory of Change</h2>
                        <p>Insluiten</p>
                        <div className='share-container'>
                            <p>{`<iframe src='https://deccos.nl/embed/theoryofchange/${client}' title="theoryofchange" width="560" height="315"></iframe>`}</p>
                        </div>
                        {/* <p>Link</p>
                        <div className='share-container'>
                            <p>{`https://deccos.nl/Stakeholders/${client}`}</p>
                        </div> */}
                    </div>
                    <div className="divider">
                        <h2>SDG's</h2>
                        <p>Insluiten</p>
                        <div className='share-container'>
                            <p>{`<iframe src='https://deccos.nl/embed/sdgs/${client}' title="sdgs" width="560" height="315"></iframe>`}</p>
                        </div>
                        {/* <p>Link</p>
                        <div className='share-container'>
                            <p>{`https://deccos.nl/Stakeholders/${client}`}</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share
