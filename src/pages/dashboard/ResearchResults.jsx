import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import Location from "../../hooks/Location"
import MenuStatus from "../../hooks/MenuStatus";
import { NavLink } from "react-router-dom";
import penIcon from '../../images/icons/pen-icon-white.png'
import { useFirestoreID, useFirestoreMeasureMoments, useFirestoreQuestionnaireFields } from "../../firebase/useFirestore";
import { useState, useEffect } from "react";
import Difference from '../../components/reserachAnalyses/difference/Difference'
import Development from '../../components/reserachAnalyses/Development/Development'
import FieldDashboard from "../../components/researchResults/FieldDashboard";
import { client } from "../../hooks/Client";

const ResearchResults = () => {
    const [questionnaireID, setQuestionnaireID] = useState('')
    const [researchTitle, setResearchTitle] = useState('')

    const menuState = MenuStatus()
    const id = Location()[3]

    const research = useFirestoreID('Research', id)
    const measureMoments = useFirestoreMeasureMoments(id)
    const fields = useFirestoreQuestionnaireFields(questionnaireID && questionnaireID)

    useEffect(() => {
        research && research.forEach(item => {
            setQuestionnaireID(item.QuestionnaireID)
            setResearchTitle(item.Title)
        })

    },[research])

  return (
    <div className="main">
        <LeftSideBar />
        <LeftSideBarFullScreen/>
        <div className="main-container" style={{display: menuState}}>
            <div className='page-header'>
                <h1>{researchTitle}</h1>
                {/* <div className='edit-icon-header-container'>
                    <NavLink activeClassName='active' to={`/${client}/ResearchOverview`}>
                        <img src={penIcon} alt="" />
                    </NavLink>
                </div> */}
            </div>
            <div className='table-container table-container-dashboard'>
                    <table>
                        <tr>
                            <th>VRAAG</th>
                            {measureMoments && measureMoments.map(moment => (
                                <th>{moment.Title.toUpperCase()}</th>
                            ))}
                            <th>ONTWIKKELING</th>
                            <th>VERSCHIL</th>
                            {/* <th>VISUALISATIE</th> */}
                        </tr>
                        {fields && fields.map(field => (
                            <tr key={field.ID}>
                                <td>
                                    <p>{field.Question}</p>
                                </td>
                                {measureMoments && measureMoments.map(moment => (
                                    <FieldDashboard field={field} moment={moment} researchID={id}/>
                                ))}
                                <td>
                                    <Development field={field} researchID={id}/>
                                </td>
                                <td>
                                    <Difference field={field} researchID={id}/>
                                </td>
                                {/* <td><Visualisation field={field} /></td> */}
                            </tr>
                        ))}
                    </table>
                </div>
        </div>
    </div>
  )
}

export default ResearchResults