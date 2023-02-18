import DifferenceScale from "./DifferenceScale"
import DifferenceOpenQuestions from "./DifferenceOpenQuestions"
import DifferenceMulti from "./DifferenceMulti"

const Difference = ({field, researchID}) => {
    if(field.Type === 'paragraph'){
        return(
              <DifferenceOpenQuestions field={field} researchID={researchID}/>
        )
    } else if(field.Type === 'scale'){
        return(
            <DifferenceScale field={field} researchID={researchID}/>
            
        )
    } else if(field.Type === 'multiple-one' || field.Type === 'multiple-multiple'){
        return(
            <DifferenceMulti field={field} researchID={researchID}/>
        )
    }else {
        return(
            <div>
                <p>Onbekend type</p>
            </div>   
        )
    }
}

export default Difference