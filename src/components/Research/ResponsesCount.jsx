import { useFirestoreQuestionnairesResponsesMoments, useFirestoreQuestionnaireFields } from "../../firebase/useFirestore"
import { useState, useEffect, useContext } from "react";

const ResponsesCount = ({moment}) => {
    const [questionnaireID, setQuestionnaireID] = useState('')

    const responses = useFirestoreQuestionnairesResponsesMoments(moment)
    const fields = useFirestoreQuestionnaireFields(questionnaireID)

    useEffect(() => {
        responses && responses.forEach(item => {
            setQuestionnaireID(item.QuestionannaireID)
        })
    },[responses])

    const count = responses.length/fields.length

  return (
    <div id='response-count'>{count === 'NaN' ? '0' : Math.round(count)}</div>
  )
}

export default ResponsesCount