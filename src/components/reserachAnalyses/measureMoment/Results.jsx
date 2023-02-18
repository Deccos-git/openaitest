import Analyse from "./Analyse";
import ScaleAnalyse from "./ScaleAnalyse";

const Results = ({moment, field, researchID}) => {

    if(field.Type === 'paragraph'){
        return(
            <div>
                <Analyse field={field} moment={moment} researchID={researchID}/>
            </div>   
        )
    } else if(field.Type === 'scale'){
        return(
            <ScaleAnalyse field={field} moment={moment} researchID={researchID}/>
        )
    } else {
        return(
            <div>
                <p>Onbekend type</p>
            </div>   
        )
    }
    
}

export default Results