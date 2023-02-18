import AnalyseDashboard from "./AnalyseDashboard";
import ScaleAnalyse from "../reserachAnalyses/measureMoment/ScaleAnalyse";

const ResultsDashboard = ({moment, field, researchID}) => {

    if(field.Type === 'paragraph'){
        return(
            <div>
                <AnalyseDashboard field={field} moment={moment} researchID={researchID}/>
            </div>   
        )
    } else if(field.Type === 'scale'){
        return(
            <ScaleAnalyse field={field} moment={moment}/>
        )
    } else {
        return(
            <div>
                <p>Onbekend type</p>
            </div>   
        )
    }
    
}

export default ResultsDashboard