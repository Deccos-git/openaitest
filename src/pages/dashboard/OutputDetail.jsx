import LeftSideBar from "../../components/LeftSideBar";
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import { client } from "../../hooks/Client"
import {useFirestoreID, useFirestoreMilestones, useFirestoreResults, useFirestoreOutputEffects, useFirestoreResearch} from "../../firebase/useFirestore"
import Location from "../../hooks/Location"
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import growIcon from '../../images/icons/grow-icon.png'
import researchIcon from '../../images/icons/research-icon.png'
import resultsIcon from '../../images/icons/results-icon.png'
import activityIcon from '../../images/icons/activity-icon.png'
import penIcon from '../../images/icons/pen-icon-white.png'
import { NavLink } from "react-router-dom";
import ScrollToTop from "../../hooks/ScrollToTop";
import EffectData from '../../components/effects/EffectData';
import SubEffectDashboard from '../../components/effects/SubEffectDashboard'

const OutputDetail = () => {
    const [outputID, setOutputID] = useState('')

    const menuState = MenuStatus()
    const history = useHistory()
    ScrollToTop()
    const route = Location()[3]

    const outputs = useFirestoreID('Outputs', route)
    const milestones = useFirestoreMilestones(outputID) 

    useEffect(() => {
        outputs && outputs.forEach(output => {
            setOutputID(output.ID)
        })
    },[outputs])

    const MilestoneProgess = ({milestone}) => {
        const [succes, setSucces] = useState(false)
        const [goal, setGoal] = useState(0)
        const [progress, setProgress] = useState([])

        const results = useFirestoreResults(milestone.OutputID)

        const progressArray = []

        useEffect(() => {
            results && results.forEach(result => {

                progressArray.push(result.Result)

                setProgress(progressArray)

            })

        },[results])

        useEffect(() => {
            milestones && milestones.forEach(milestone => {

                setGoal(milestone.Number)
                setSucces(milestone.Succes)

            })
         },[milestones])

         const sum = progress.reduce((partialSum, a) => partialSum + a, 0);

        const width = sum*100/goal

         const succesColor = () => {
            if(succes === true){
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
                    <div className='progressbar-progress' style={{width: `${width}%`, backgroundColor: succesColor()}}></div>
                </div>
            </div>
        )
    }

    const Effects = ({output}) => {

        const effects = useFirestoreOutputEffects(output.ID)

        const positiveNegative = (posNeg) => {

            if(posNeg === 'positive'){
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
            <>
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
            </>
        )
    }

    const Research = ({output}) => {

        const researches = useFirestoreResearch(output.ID) 

        const researchLink = () => {
            history.push(`/${client}/ResearchSettings/`)
        }

        return(
            <ul>
                {researches && researches.map(research => (
                    <li style={{cursor: 'pointer'}} onClick={researchLink}>{research.Title}</li>
                ))}
            </ul>
        )
    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Output</h1>
            <div className='edit-icon-header-container'>
                <NavLink activeClassName='active' to={`/${client}/AddOutput`}>
                    <img src={penIcon} alt="" />
                </NavLink>
            </div>
        </div>
        <div className='card-container'>
          {outputs && outputs.map(output => (
            <div key={output.ID} className='instrument-card output-card-container'>
                <h2>{output.Title}</h2>
                <div className='task-detail-inner-container'>
                <div className='activity-meta-title-container'>
                        <img src={activityIcon} alt="" />
                        <h3>Activiteit</h3>
                    </div>
                    <p className='questionnaire-results-container'>{output.Activity}</p>
                    <div className='activity-meta-title-container'>
                        <img src={resultsIcon} alt="" />
                        <h3>Effect</h3>
                    </div>
                    <Effects output={output}/>
                    <div>
                        <div className='activity-meta-title-container'>
                            <img src={growIcon} alt="" />
                            <h3>Mijlpalen</h3>
                        </div>
                        {milestones && milestones.map(milestone => (
                            <MilestoneProgess milestone={milestone}/>
                        ))}
                    </div>
                    <div>
                        <div className='activity-meta-title-container'>
                            <img src={researchIcon} alt="" />
                            <h3>Onderzoeken</h3>
                        </div>
                        <Research output={output}/>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OutputDetail