import Results from '../../components/reserachAnalyses/measureMoment/Results'
import {useFirestoreQuestionnairesResponses} from "../../firebase/useFirestore";
import MultipleResults from './measureMoment/MultipleResults';

const Field = ({field, moment, researchID}) => {

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
                <Results moment={moment} field={field} results={results} researchID={researchID}/>
            </td>
        )
    }

    
}

export default Field