import { useFirestoreID, useFirestoreImpactTargetgroup, useFirestoreImpactSociety } from "../../firebase/useFirestore"
import { motion } from "framer-motion"
import worldIcon from '../../images/icons/world-icon.png'
import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import Location from "../../hooks/Location"
import MenuStatus from "../../hooks/MenuStatus";
import leafIcon from '../../images/icons/leaf-icon.png'
import newUserIcon from '../../images/icons/new-user-icon.png'
import groupIcon from '../../images/icons/group-icon.png'
import preconditionsIcon from '../../images/icons/preconditions-icon.png'
import externalFactorsIcon from '../../images/icons/external-factors-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";

const GoalDetail = () => {
    const route = Location()[3]
    const menuState = MenuStatus()
    ScrollToTop()

    const docs = useFirestoreID("Goals", route)

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const ImpactTargetgroup = ({doc}) => {

        const impactTargetgroup = useFirestoreImpactTargetgroup(doc.ID && doc.ID)

        return(
            <ul>
                {impactTargetgroup && impactTargetgroup.map(impact => (
                    <li>{impact.ImpactTargetgroup}</li>
                ))}
            </ul>
        )
    }

    const ImpactSociety = ({doc}) => {

        const impactSociety = useFirestoreImpactSociety(doc.ID && doc.ID)

        return(
            <ul>
                {impactSociety && impactSociety.map(impact => (
                    <li>{impact.ImpactSociety}</li>
                ))}
            </ul>
        )
    }

    return (
        <div className="main">
            <LeftSideBar />
            <LeftSideBarFullScreen/>
            <div className="card-overview goal-detail-container" style={{display: menuState}}>
            {docs && docs.map(doc => (
                <motion.div className="article" key={doc.id}>
                    <img src={doc.Banner} alt="" className='goal-detail-banner' />
                    <div className="list-inner-container">
                        <div className='activity-meta-title-container'>
                            <h2>{doc.Title}</h2>
                        </div>
                        <div className='activity-meta-title-container'>
                            <img src={groupIcon} alt="" />
                            <h3>Doelgroep</h3>
                        </div>
                        <p className='output-seeting-effect'>{doc.Targetgroup}</p>
                        <div className='activity-meta-title-container'>
                            <img src={newUserIcon} alt="" />
                            <h3>Impact op doelgroep</h3>
                        </div>
                        <ImpactTargetgroup doc={doc}/>
                         <div className='activity-meta-title-container'>
                            <img src={leafIcon} alt="" />
                            <h3>Impact op maatschappij</h3>
                        </div>
                        <ImpactSociety doc={doc}/>
                        <div className='activity-meta-title-container'>
                            <img src={worldIcon} alt="" />
                            <h3>Bijdrage aan SDG's</h3>
                        </div>
                        <ul>
                        {doc.SDG && doc.SDG.map(sdg => (
                            <li>{sdg}</li>
                        ))}
                        </ul>
                        <div className='goal-meta-title-container'>
                            <img src={preconditionsIcon} alt="" />
                            <h3>Randvoorwaarden</h3>
                        </div>
                        <p className='output-seeting-effect'>{doc.Preconditions}</p>
                        <div className='goal-meta-title-container'>
                            <img src={externalFactorsIcon} alt="" />
                            <h3>Externe factoren</h3>
                        </div>
                        <p className='output-seeting-effect'>{doc.ExternalFactors}</p>
                    </div>
                    <p>{doc.Timestamp.toDate().toLocaleDateString("nl-NL", options)}</p>
                </motion.div>
                ))
            }
            </div>
        </div>
    )
}

export default GoalDetail
