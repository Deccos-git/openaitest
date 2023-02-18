import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import {ReactComponent as MagicIcon}  from '../../images/icons/magic-icon.svg'
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import { client } from '../../hooks/Client';
import { NavLink, Link } from "react-router-dom";
import ScrollToTop from "../../hooks/ScrollToTop";

const Introduction = () => {

    const menuState = MenuStatus() 

    ScrollToTop()

  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className="page-header">
                <h1>Impact Guide</h1>
                <div className='wizard-sub-nav-introduction'>
                    <NavLink to={`/${client}/Explainer`} >
                        <div className='step-container'>
                            <p>Wat is impact management?</p>
                            <img src={arrowRight} alt="" />
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className='profile profile-auth-profile'>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={capIcon} alt="" />
                        <h3>Uitleg</h3>
                    </div> 
                    <div className='text-section'>
                        <p><b>Welkom bij de Impact Guide. Deze guide is gemaakt om je te ondersteunen in het vormgeven 
                            van je impactmanagement.</b></p>
                        <p>  
                            Meetbare impact is de bestaansreden van een sociale organisatie. Daarom is impactmanangement 
                            net zo belangrijk voor een sociale organisatie als bijvoorbeeld de boekhouding.
                            Wanneer je impact management integreert in je bedrijfsvoering kun je beter sturen 
                            op de impact die je wilt maken en kun je die impact helderder communiceren naar je stakeholders.
                        </p>
                        <p>
                            Je hoeft het niet in een keer 100% goed te doen,
                            maar het is goed om er gewoon mee te beginnen. De Impact Guide helpt je daarmee.
                        </p>
                            
                        <p>Ben je het overzicht kwijt of wil je weer een volgende stap zetten? Klik op het &nbsp;
                                <MagicIcon style={{width: '19px', height: '19px'}}/>
                                &nbsp; icon in de bovenbalk (onderbalk op mobiel)
                            om weer terug te komen in de guide.</p>
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={rocketIcon} alt="" />
                        <h3>Aan de slag</h3>
                    </div> 
                    <div className='text-section'>
                        <div className='wizard-introduction-menu-card'>
                            <p><b>Context</b></p>
                            <div className='wizard-introduction-menu-container column'>
                                <NavLink to={`/${client}/Explainer`} >1. Wat is impactmanagement?</NavLink>
                                <NavLink to={`/${client}/ProblemAnalysis`} >2. Probleemanalyse</NavLink>
                                <NavLink to={`/${client}/StakeholderAnalysis`} >3. Stakeholders</NavLink>
                                <NavLink to={`/${client}/GoalTitle`} >4. Impactdoelen</NavLink>
                                <NavLink to={`/${client}/Targetgroup`} >5. Doelgroep bepalen </NavLink>
                            </div>
                        </div>
                        <div className='wizard-introduction-menu-card'>
                            <p><b>Verandertheorie (Theory Of Change)</b></p>
                            <div className='wizard-introduction-menu-container column'>
                                <NavLink to={`/${client}/SDGs`} >6. Bijdrage aan SDG's</NavLink>
                                <NavLink to={`/${client}/Assumptions`} >7. Aannames</NavLink>
                                <NavLink to={`/${client}/Conditions`} >8. Externe factoren</NavLink>
                                <NavLink to={`/${client}/AddActivity`} >9. Activiteiten</NavLink>
                                <NavLink to={`/${client}/AddOutput`} >10. Outputs</NavLink>
                                <NavLink to={`/${client}/OutputEffects`} >11. Effecten</NavLink>
                            </div>
                        </div>
                        <div className='wizard-introduction-menu-card'>
                            <p><b>MKBA's & personas</b></p>
                            <div className='wizard-introduction-menu-container column'>
                                <NavLink to={`/${client}/AddSROI`} >12. MKBA's</NavLink> 
                            </div> 
                            <div className='wizard-introduction-menu-container column'>
                                <NavLink to={`/${client}/addpersonas`} >13. Personas</NavLink> 
                            </div>                  
                        </div>
                        <div className='wizard-introduction-menu-card'>
                            <p><b>Meten</b></p>
                            <div className='wizard-introduction-menu-container column'>
                                <NavLink to={`/${client}/MeasureOutput`} >14. Mijlpalen stellen</NavLink>
                                <NavLink to={`/${client}/Questionnaires`} >15. Vragenlijsten</NavLink>
                                <NavLink to={`/${client}/ResearchOverview`} >16. Onderzoeken</NavLink>
                                <NavLink to={`/${client}/ResearchAnalyses`} >17. Onderzoeksanalyse</NavLink>
                                <NavLink to={`/${client}/Projectmanagement`} >18. Projectbeheer</NavLink>
                                <NavLink to={`/${client}/KPIs`} >19. KPIs</NavLink>
                            </div>
                        </div>
                        <div className='wizard-introduction-menu-card'>
                            <p><b>Communiceren</b></p>
                            <div className='wizard-introduction-menu-container column'>
                                <NavLink to={`/${client}/Impactclub`} >20. Community</NavLink>
                            </div>
                            <div className='wizard-introduction-menu-container column'>
                                <NavLink to={`/${client}/finpactSettings`} >21. Financiers</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={bulbIcon} alt="" />
                        <h3>Tips</h3>
                    </div> 
                    <div className='text-section'>
                        <ol>
                            <li>
                                Benieuwd naar de impact van andere sociale MKB'ers? Neem eens een kijkje in de <a href="https://deccos.nl/Milestones">community</a>.
                            </li>
                        </ol>
                    </div>
                </div>
                <div>
                    <div className='activity-meta-title-container'>
                        <img src={feetIcon} alt="" />
                        <h3>Volgende stap</h3>
                    </div> 
                    <div className='text-section'>
                        <p>In de volgende stap lees je meer over wat impact management inhoudt.</p>
                        <NavLink to={`/${client}/Explainer`} ><button>Volgende stap</button></NavLink>
                    </div>
                </div>
            </div> 
        </div>
    </div>
)
}

export default Introduction