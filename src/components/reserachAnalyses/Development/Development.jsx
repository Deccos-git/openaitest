import ResearchResultsGraph from "../../common/ResearchResultsGraph";
import OpenQuestionDevelopment from "./OpenQuestionDevelopment";
import GroupDevelopment from "./GroupDevelopment";
import ScaleQuestionResults from "./ScaleQuestionResults";
import { useFirestoreQuestionnairesResponsesResearch } from "../../../firebase/useFirestore";
import SaveDatapoint from "../../datapoints/SaveDatapoint";

const Development = ({field, researchID}) => {

    const results = useFirestoreQuestionnairesResponsesResearch(researchID, field.ID)

    const totalArray = ScaleQuestionResults(researchID, field)

   
    if(field.Type === 'paragraph'){
        return(
            <div>
                <OpenQuestionDevelopment field={field} researchID={researchID}/>
            </div>   
        )
    } else if(field.Type === 'scale'){
        return(
            <div>
                <ResearchResultsGraph results={totalArray}/>
                <SaveDatapoint field={field} type={'research-scale-development'} researchID={researchID} title={field.Question}/>
            </div>
            
        )
    } else if(field.Type === 'multiple-one'){
        return(
            <GroupDevelopment results={results} field={field} researchID={researchID}/>
        )
    }else if(field.Type === 'multiple-multiple'){
        return(
            <GroupDevelopment results={results} field={field} researchID={researchID}/>
        )
    }else {
        return(
            <div>
                <p>Onbekend type</p>
            </div>   
        )
    }
}

export default Development