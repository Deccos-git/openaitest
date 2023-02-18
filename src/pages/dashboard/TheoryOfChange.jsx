import { 
    useFirestore, 
    useFirestoreActivities, 
    useFirestoreOutputs,
    useFirestoreTargetgroup,
    useFirestoreImpactActivity,
    useFirestoreOutputEffects,
    useFirestoreAssumptions,
    useFirestoreConditions,
    useFirestoreImpactTargetgroup,
    useFirestoreImpactSociety
} from "../../firebase/useFirestore";
import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import shareIcon from '../../images/icons/share-icon-white.png'
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import NoContentNotice from "../../hooks/NoContentNotice";
import ScrollToTop from "../../hooks/ScrollToTop";
import worldIcon from '../../images/icons/world-icon.png'
import groupIcon from '../../images/icons/group-icon.png'
import leafIcon from '../../images/icons/leaf-icon.png'
import newUserIcon from '../../images/icons/new-user-icon.png'
import effectIcon from '../../images/icons/traject-icon.png'
import outputIcon from '../../images/icons/output-icon.png'
import preconditionsIcon from '../../images/icons/preconditions-icon.png'
import externalFactorsIcon from '../../images/icons/external-factors-icon.png'
import impactIcon from '../../images/icons/impact-icon.png'
import arrowUpIcon from '../../images/icons/arrow-up-icon-fat.png'

const TheoryOfChange = () => {
    const menuState = MenuStatus()
    ScrollToTop()

    const allGoals = useFirestore('Goals')

    const Goals = () => {
        
        const goals = useFirestore('Goals')


        return(
            <>
            {goals && goals.map(goal => (
            <div key={goal.ID} className='profile profile-auth-profile'>
                <h1>Doel</h1>
            <img id='impact-dasboard-goal-banner' src={goal.Banner} alt="" />
            <div id='impact-progress-goal-container' className='divider'>
                <h2>{goal.Title}</h2>
                <div id='goal-meta-container'>
                    <div className='goal-meta-inner-container'>
                        <div className='goal-meta-title-container'>
                            <img src={groupIcon} alt="" />
                            <h3>Doelgroepen</h3>
                        </div>
                        <Targetgroups goal={goal}/>
                    </div>
                    <div className='goal-meta-inner-container' >
                        <div className='goal-meta-title-container'>
                            <img src={newUserIcon} alt="" />
                            <h3>Impact op doelgroep</h3>
                        </div>
                        <ImpactTargetgroup goal={goal}/>
                    </div>
                    <div className='goal-meta-inner-container' >
                        <div className='goal-meta-title-container'>
                            <img src={leafIcon} alt="" />
                            <h3>Impact maatschappij</h3>
                        </div>
                        <ImpactSociety goal={goal}/>
                    </div>
                    <Assumptions goal={goal}/>
                    <ExternalFactors goal={goal}/>
                </div>
            </div>
            <Activities goal={goal}/>
            </div>
            ))}
        </>
        )
    }

    const Targetgroups = ({goal}) => {

        const targetgroups = useFirestoreTargetgroup(goal.ID && goal.ID)

        return(
            <ul>
                {targetgroups && targetgroups.map(item => (
                    <li key={item.ID}>{item.Name}</li>
                ))}
            </ul>
        ) 
    }

    const ImpactTargetgroup = ({goal}) => {

        const impactTargetgroup = useFirestoreImpactTargetgroup(goal.ID && goal.ID)

        return(
            <ul>
                {impactTargetgroup && impactTargetgroup.map(impact => (
                    <li key={impact.ID}>{impact.ImpactTargetgroup} - <b>{impact.PosNeg === 'positive' ? 'Positief' : 'Negatief'}</b></li>
                ))}
            </ul>
        )
    }

    const ImpactSociety = ({goal}) => {

        const impactSociety = useFirestoreImpactSociety(goal.ID && goal.ID)

        return(
            <ul>
                {impactSociety && impactSociety.map(impact => (
                    <li key={impact.ID}>{impact.ImpactSociety} - <b>{impact.PosNeg === 'positive' ? 'Positief' : 'Negatief'}</b></li>
                ))}
            </ul>
        )
    }

    const Assumptions = ({goal}) => {

        const assumptions = useFirestoreAssumptions(goal.ID)

        return(
            <div className='goal-meta-inner-container' style={{display: assumptions.length > 0 ? 'block' : 'none'}}>
                <div className='goal-meta-title-container'>
                    <img src={preconditionsIcon} alt="" />
                    <h3>Aannames</h3>
                </div>
                <ul>
                    {assumptions && assumptions.map(assumption => (
                        <li key={assumption.ID}>{assumption.Assumption}</li>
                    ))}
                </ul>
            </div>
        )

    }

    const ExternalFactors = ({goal}) => {

        const externalFactors = useFirestoreConditions(goal.ID)

        return(
            <div className='goal-meta-inner-container' style={{display: externalFactors.length > 0 ? 'block' : 'none'}}>
                <div className='goal-meta-title-container'>
                    <img src={externalFactorsIcon} alt="" />
                    <h3>Externe factoren</h3>
                </div>
                <ul>
                    {externalFactors && externalFactors.map(factor => (
                        <li key={factor.ID}>{factor.Condition}</li>
                    ))}
                </ul>
            </div>
        )

    }

    const Activities = ({goal}) => {

        const activities = useFirestoreActivities(goal.ID)

        return(
            <div style={{display: activities.length > 0 ? 'block' : 'none'}}>
                <h2>Activiteiten</h2>
                <div id='activity-outer-container'>
                {activities && activities.map(activity => (
                    <div className='activity-inner-container-dashboard' key={activity.ID}>
                        <img id='impact-dasboard-activity-banner' src={activity.Banner} alt="" />
                        <h3 id='activity-title'>{activity.Activity}</h3>
                        <div className='goal-meta-inner-container' style={{display: activity.Impact ? 'block' : 'none'}}>
                            <div className='goal-meta-title-container'>
                                <img src={impactIcon} alt="impact icon" />
                                <h3>Impact</h3>
                            </div>
                            <ImpactActivity activity={activity}/>
                            <Outputs activity={activity}/>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        )
    }

    const ImpactActivity = ({activity}) => {

        const impacts = useFirestoreImpactActivity(activity.ID && activity.ID)

        return(
            <>
                <ul >
                    {impacts && impacts.map(impact => (
                        <li key={impact.ID}>{impact.Impact} - <b>{impact.PosNeg === 'positive' ? 'Positief' : 'Negatief'}</b></li>
                    ))} 
                </ul>  
            </>
        )
    }

    const Outputs = ({activity}) => {
        const outputs = useFirestoreOutputs(activity.ID)

        return(
            <div style={{display: outputs.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={outputIcon} alt="" />
                    <h3>Outputs</h3>
                </div>
                {outputs && outputs.map(output => (
                    <div key={output.ID} className='impact-dashboard-output-container'>
                        <h3 className='output-title'>{output.Title}</h3>
                        <Effects output={output}/>
                       
                    </div>
                ))} 
            </div>
        )
    }

    const Effects = ({output}) => {

        const effects = useFirestoreOutputEffects(output.ID)

        return(
            <div className='dashboard-instruments-container' style={{display: effects.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={effectIcon} alt="" />
                    <h3>Effect</h3>
                </div>
                <ul>
                {effects && effects.map(effect => (
                    <li key={effect.ID}>{effect.Effect} - <b>{effect.PosNeg === 'positive' ? 'Positief' : 'Negatief'}</b></li>
                ))}
                </ul>
            </div>
        )
    }



    return (
        <div className="main">
            <LeftSideBar />
            <LeftSideBarFullScreen/>
            <div className="main-container" style={{display: menuState}}>
                <div className="page-header">
                    <h1>Theory of Change</h1>
                </div>
                <Goals/>
                {NoContentNotice(allGoals, 'Introduction')}
            </div>
        </div>
    )
}

export default TheoryOfChange
