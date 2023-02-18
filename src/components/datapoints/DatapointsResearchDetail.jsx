import React from 'react'
import { useFirestoreID, useFirestoreMeasureMoments, useFirestoreQuestionnaireFields } from '../../firebase/useFirestore'
import { useState, useEffect } from 'react'
import FieldDashboard from '../researchResults/FieldDashboard'
import Development from "../reserachAnalyses/Development/Development"
import Difference from '../reserachAnalyses/difference/Difference'

const DatapointsResearchDetail = ({researchID}) => {
    const [questionnaireID, setQuestionnaireID] = useState('')

    const researches = useFirestoreID('Research', researchID) 
    const selectedResearch = useFirestoreID('Research', researchID && researchID)
    const measureMoments = useFirestoreMeasureMoments(researchID && researchID)
    const fields = useFirestoreQuestionnaireFields(questionnaireID && questionnaireID)

    useEffect(() => {
        selectedResearch && selectedResearch.forEach(research => {
            setQuestionnaireID(research.QuestionnaireID)
        })

    },[selectedResearch])

  return (
    <div className='table-container'>
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
                            <FieldDashboard field={field} moment={moment} researchID={researchID}/>
                        ))}
                        <td>
                            <Development field={field} researchID={researchID}/>
                        </td>
                        <td>
                            <Difference field={field} researchID={researchID}/>
                        </td>
                        {/* <td><Visualisation field={field} /></td> */}
                    </tr>
                ))}
            </table>
    </div>
  )
}

export default DatapointsResearchDetail