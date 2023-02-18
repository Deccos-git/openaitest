import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { 
    useFirestore, 
    useFirestoreID,
    useFirestoreActivities, 
    useFirestoreOutputs,
    useFirestoreMilestones,
    useFirestoreResults,
    useFirestoreSROIs,
    useFirestoreSDGsSelected,
    useFirestoreOutputEffects,
    useFirestoreResearch,
    useFirestoreMeasureMoments,
    useFirestoreAssumptions,
    useFirestoreConditions,
    useFirestoreConclusions,
    useFirestoreImpactTargetgroup,
    useFirestoreImpactSociety,
    useFirestoreTargetgroup,
    useFirestoreImpactActivity,
    useFirestoreSROISetsType,
    useFirestorePersonas
} from "../../firebase/useFirestore";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { db } from "../../firebase/config";
import worldIcon from '../../images/icons/world-icon.png'
import groupIcon from '../../images/icons/group-icon.png'
import leafIcon from '../../images/icons/leaf-icon.png'
import newUserIcon from '../../images/icons/new-user-icon.png'
import effectIcon from '../../images/icons/traject-icon.png'
import outputIcon from '../../images/icons/output-icon.png'
import preconditionsIcon from '../../images/icons/preconditions-icon.png'
import externalFactorsIcon from '../../images/icons/external-factors-icon.png'
import impactIcon from '../../images/icons/impact-icon.png'
import checkIcon from '../../images/icons/check-icon.png'
import calendarIcon from '../../images/icons/calendar-icon.png'
import growIcon from '../../images/icons/grow-icon.png'
import ManualResultsGraph from "../../components/common/ManualResultsGraph";
import sroiIcon from '../../images/icons/sroi-icon.png'
import researchIcon from '../../images/icons/research-icon.png'
import NoContentNotice from "../../hooks/NoContentNotice";
import ScrollToTop from "../../hooks/ScrollToTop";
import listIcon from '../../images/icons/list-icon.png'
import shareIcon from '../../images/icons/share-icon-white.png'
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import SubEffectDashboard from "../../components/effects/SubEffectDashboard";
import resultsIcon from '../../images/icons/results-icon.png'
import EffectData from "../../components/effects/EffectData";

const ImpactProgress = () => {
    const [questionniare, setQuestionniare] = useState('')

    const menuState = MenuStatus()
    const history = useHistory()
    ScrollToTop()

    const questionnaireAnalysis = useFirestore('QuestionnaireAnalysis')
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
                    <SDGS goal={goal}/>
                    <div className='goal-meta-inner-container'>
                        <div className='goal-meta-title-container'>
                            <img src={groupIcon} alt="" />
                            <h3>Doelgroepen</h3>
                        </div>
                        <Targetgroups goal={goal}/>
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

    const SDGS = ({goal}) => {
        const SDGs = useFirestoreSDGsSelected(goal.ID)

        return(
            <div className='goal-meta-inner-container' style={{display: SDGs.length > 0 ? 'block' : 'none'}}>
                <div className='goal-meta-title-container'>
                    <img src={worldIcon} alt="" />
                    <h3>SDGs</h3>
                </div>
                <ul>
                    {SDGs && SDGs.map(sdg => (
                    <li key={sdg.ID}>{sdg.SDG}</li>
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
                        <div className='goal-meta-inner-container' >
                            <Outputs activity={activity}/>
                        </div>
                    </div>
                ))}
                </div>
            </div>
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
                        <div className='dashboard-instruments-container'>
                            <ManualResults output={output}/>
                        </div>
                        <Effects output={output}/>
                        <Research output={output}/>
                        <Personas output={output}/>
                        <Milestones output={output}/>
                    </div>
                ))} 
            </div>
        )
    }

    const Effects = ({output}) => {

        const effects = useFirestoreOutputEffects(output.ID)

        const positiveNegative = (effect) => {

            if(effect === 'positive'){
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

        return(
            <div className='dashboard-instruments-container' style={{display: effects.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={effectIcon} alt="" />
                    <h3>Effecten</h3>
                </div>
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
        )
    }

    const Personas =({output}) => {

        const personas = useFirestorePersonas(output.ID)

        return(
            <div className='dashboard-instruments-container' style={{display: personas.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={researchIcon} alt="" />
                    <h3>Personas</h3>
                </div>
                <div className='dashboard-persona-outer-container'>
                    {personas && personas.map(item => (
                        <div key={item.ID} className='dashboard-persona-container' onClick={() => history.push(`/${client}/personadetail/${item.ID}`)}>
                            <img src={item.Photo} alt="" />
                            <p>{item.Name}</p>
                        </div>  
                    ))}
                </div>
                
            </div>
        )
    }

    const Research = ({output}) => {

        const researches = useFirestoreResearch(output.ID) 

        return(
            <div className='dashboard-instruments-container' style={{display: researches.length > 0 ? 'block' : 'none'}}>
                 <div className='activity-meta-title-container'>
                    <img src={researchIcon} alt="" />
                    <h3>Onderzoeken</h3>
                </div>
                {researches && researches.map(research => (
                    <div key={research.ID} className='impact-dashboard-output-inner-container'>
                        <h4>{research.Title}</h4>
                        <Questionnaire research={research}/>
                        <MeasureMoments research={research}/>
                        {/* <QuestionnaireResults research={research}/> */}
                        <Conclusions research={research}/>
                    </div>
                ))}
            </div>
        )
    }

    const Questionnaire = ({research}) => {

        const questionnaires = useFirestoreID("Questionnaires", research.QuestionnaireID)

        return (
            <div className='activity-meta-title-container' style={{display: questionnaires.length > 0 ? 'block' : 'none'}}>
            <div className='activity-meta-title-container'>
                <img src={listIcon} alt="" />
                <h4>Vragenlijst</h4>
            </div>
            <div className='table-container output-seeting-effect'>
                <table className='table-impact-dashboard'>
                    <tr>
                        <th>VRAGENLIJST</th>
                        <th>EVIDENCE BASED</th>
                    </tr>
                    {questionnaires && questionnaires.map(questionnaire => (
                        <tr key={questionniare.ID}>
                            <td>{questionnaire.Title}</td>
                            <td>{questionnaire.EvidenceBased === true ? 'Ja' : 'Nee'}</td>
                        </tr>
                    ))}
                </table>
            </div>   
        </div>
        )
    }

    const MeasureMoments = ({research}) => {

        const moments = useFirestoreMeasureMoments(research.ID)

        return(
            <div className='activity-meta-title-container' style={{display: moments.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={calendarIcon} alt="" />
                    <h4>Meetmomenten</h4>
                </div>
                <div className='table-container output-seeting-effect'>
                    <table className='table-impact-dashboard'>
                        <tr>
                            <th>MEETMOMENT</th>
                            <th>DATUM</th>
                            {/* <th>RESULTAAT</th> */}
                        </tr>
                        {moments && moments.map(moment => (
                            <tr key={moment.ID}>
                                <td>{moment.Title}</td>
                                <td>{moment.Moment}</td>
                                {/* <td>{moment.Complete}</td> */}
                            </tr>
                        ))}
                    </table>
                </div>   
            </div>
        )

    }

    const Conclusions = ({research}) => {

        const conclusions = useFirestoreConclusions(research.ID)

        const conclusionType = (conclusion) => {
            if(conclusion.Type == 'Plus'){
                return 'Pluspunt'
            } else if (conclusion.Type == 'Learningpoint'){
                return 'Verbeterpunt'
            }
        }

        return(
            <div className='activity-meta-title-container' style={{display: conclusions.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={checkIcon} alt="" />
                    <h4>Conclusies</h4>
                </div>
                <div className='table-container output-seeting-effect'>
                    <table className='table-impact-dashboard'>
                        <tr>
                            <th>CONCLUSIE</th>
                            <th>TYPE</th>
                        </tr>
                        {conclusions && conclusions.map(conclusion => (
                            <tr key={conclusion.ID}>
                                <td>{conclusion.Conclusion}</td>
                                <td>{conclusionType(conclusion)}</td>
                            </tr>
                        ))}
                    </table>
                </div>   
            </div>
        )
    }

    const Milestones = ({output}) => {

        const milestones = useFirestoreMilestones(output.ID) 

        return(
            <div className='dashboard-instruments-container' style={{display: milestones.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={growIcon} alt="" />
                    <h3>Mijlpalen</h3>
                </div>
                {milestones && milestones.map(milestone => (
                    <div key={milestone.ID} className='impact-dashboard-output-inner-container'>
                        <h4>{milestone.Number} {milestone.Title.toLowerCase()}</h4>
                        <MilestoneProgress milestone={milestone}/>
                    </div>
                ))}
            </div>
        )
    }

    const ManualResults =({output}) => {

        const SROIs = ''

        return (
            <Results output={output} SROIs={SROIs}/>
        )
    }

   const MilestoneProgress = ({milestone}) => {
        const [progress, setProgress] = useState([])
       
        const results = useFirestoreResults(milestone.OutputID)

        const progressArray = []

        useEffect(() => {
            results && results.forEach(result => {

                progressArray.push(result.Result)

                setProgress(progressArray)

            })

        },[results])

        const sum = progress.reduce((partialSum, a) => partialSum + a, 0);

        const goal = milestone.Number

        const width = sum*100/goal

        const checkSucces = () => {
            db.collection('Milestones')
            .doc(milestone.docid)
            .update({
                Succes: true
            })
        }

        const succes = () => {

            if(sum >= goal){
                checkSucces()
                return '#00cd00'
            } else {
                return '#63cadc'
            }
        }

        const total = () => {

            if(sum > milestone.Number){
                return `${milestone.Number} of meer`
            } else {
                return sum
            }
         }

         const percentage = () => {
             if(width > 100){
                 return `(100%)`
             } else {
                return `(${(Math.round(width * 100) / 100).toFixed(2)}%)`
             }
         }

    return(
        <div className='milestone-progress-container'>
            <div className='percentage-container'>
                <p>Huidig: {total()} {percentage()}</p>
                <p>Doel: {goal}</p>
            </div>
            
            <div className='progressbar-outer-bar'>
                <div className='progressbar-progress' style={{width: `${width}%`, backgroundColor: succes()}}></div>
            </div>

        </div>
        
        )
   }


    const Results = ({output, SROIs}) => {
        const [totalSROI, setTotalSROI] = useState(0)
        const [SROIType, setSROIType] = useState('')

        const dataset = useFirestoreResults(output.ID)

        useEffect(() => {
            SROIs && SROIs.forEach(sroi => {
                setTotalSROI(Number(sroi.Amount))
                setSROIType(sroi.Type)
            })
        })

        const Link = ({totalSROI}) => {

            const SROISets = ''

            return(
                <>
                    {SROISets && SROISets.map(item => (
                        <a key={item.ID} target='_blank' href={item.Link}>€{totalSROI}</a>
                    ))}
                </>
            )
        }

        return(
            <>
            <div className='internal-results-container'>
            <div className='activity-meta-title-container'>
                <img src={resultsIcon} alt="" />
                <h3>Output resultaten</h3>
            </div>
                <ManualResultsGraph output={output}/>
            </div>
            <div className='internal-results-container' style={{display: SROIs.length > 0 ? 'block' : 'none'}}>
                <div className='activity-meta-title-container'>
                    <img src={sroiIcon} alt="" />
                    <h3>SROI</h3>
                </div>
                <p className='output-seeting-effect'>{dataset.length} {output.Title} x <Link totalSROI={totalSROI}/> = €{dataset.length*totalSROI} per jaar</p>
            </div>
            </>
        )
    }

    // const QuestionnaireResults = ({instrument}) => {

    //     const questionnaires = useFirestoreID('Questionnaires', instrument.Output.ID) 

    //     return(
    //         <div>
    //             {questionnaires && questionnaires.map(questionnaire => (
    //                 <div key={questionnaire.ID} className='questionnaire-results-container'>
    //                     <p>Aantal responses</p>
    //                     <p>{questionnaire.Responses ? questionnaire.Responses : 0}</p>
    //                     <p>Bekijk analyse</p>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }

    return (
        <div className="main">
            <LeftSideBar />
            <LeftSideBarFullScreen/>
            <div className="main-container" style={{display: menuState}}>
                <div className="page-header">
                    <h1>Impact dashboard</h1>
                </div>
                <Goals/>
                {NoContentNotice(allGoals, 'Introduction')}
            </div>
        </div>
    )
}

export default ImpactProgress