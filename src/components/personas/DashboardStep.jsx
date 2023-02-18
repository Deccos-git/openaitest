import DashboardActivityMeta from "./DashboardActivityMeta"
import DashboardResearchMeta from "./DashboardResearchMeta"
import checkIcon from '../../images/icons/check-icon.png'
import StepResearchResults from "./StepResearchResults"

const DashboardStep = ({step, persona, index}) => {
    if(step.Type === 'text'){
        return (
            <div className='dashboard-step-container'>
                <p>{step.Position}</p>
                <h2>Momentopname</h2>
                <p>{step.Title}</p> 
                <div className='goal-meta-title-container'>
                    <img src={checkIcon} alt="" />
                    <p><b>Resultaat</b></p>
                </div>
                <p className='dashboard-step-description' dangerouslySetInnerHTML={{__html:step.Description}}></p>
            </div>
          )
    } else if(step.Type === 'activity'){
        return (
            <div className='dashboard-step-container'>
                <p>{step.Position}</p>
                <h2>Deelname aan activiteit</h2>
                <div className='edit-type-container'>
                    <p>{persona.Name} heeft meegedaan aan de activiteit</p>
                    <DashboardActivityMeta step={step}/>
                </div>
                <div className='goal-meta-title-container'>
                    <img src={checkIcon} alt="" />
                    <p><b>Resultaat</b></p>
                </div>
                <p className='dashboard-step-description' dangerouslySetInnerHTML={{__html:step.Description}}></p>
            </div>
          )
    } else if(step.Type === 'research'){
        return (
            <div className='dashboard-step-container'>
                <p>{step.Position}</p>
                <h2>Deelname aan onderzoek</h2>
                <div className='edit-type-container'>
                    <p>{persona.Name} heeft deelgenomen aan het onderzoek</p> 
                    <DashboardResearchMeta step={step}/>
                </div>
                <div className='goal-meta-title-container'>
                    <img src={checkIcon} alt="" />
                    <p><b>Resultaat</b></p>
                </div>
                <StepResearchResults step={step}/>
            </div>
          )
    } else{
        return(
            <div></div>
        )
    }
}

export default DashboardStep