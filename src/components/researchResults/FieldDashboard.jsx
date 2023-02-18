import ResultsDashboard from "./ResultsDashboard";
import {useFirestoreQuestionnairesResponses} from "../../firebase/useFirestore";
import MultipleResults from '../reserachAnalyses/measureMoment/MultipleResults'

const FieldDashboard = ({field, moment, researchID}) => {

    const results = useFirestoreQuestionnairesResponses(field.ID, moment.ID)

    if(field.Multiple && field.Multiple?.length > 0){
        return(
            <td>
                <MultipleResults moment={moment} field={field} results={results} researchID={researchID}/>
            </td>
        )
    } else {
        return(
            <td>
                <ResultsDashboard moment={moment} field={field} results={results} researchID={researchID}/>
            </td>
        )
    }

    
}

export default FieldDashboard