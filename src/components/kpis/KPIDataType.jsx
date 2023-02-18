import Inputs from "../reserachAnalyses/Development/Inputs";
import ResearchResultsGraph from "../common/ResearchResultsGraph";
import ResearchMeta from "./ResearchMeta";
import ScaleQuestionResults from "../reserachAnalyses/Development/ScaleQuestionResults";
import WordCountKPI from "./WordCountKPI";
import ManualResultsGraph from "../common/ManualResultsGraph";
import MultipleResultsKpi from "./MultipleResultsKpi";
import ScaleMeasureMomentKPI from "./ScaleMeasureMomentKPI";

const KPIDataType = ({dataset, parent}) => {

    const borderStyle = () => {
        if(parent === 'effect'){
            return 'kpi-data-container-no-border'
        }
    }

    if(dataset.Type === 'research-multiple'){
        return (
            <div className={`kpi-data-container ${borderStyle()}`} >
                <div className='kpi-results-container'>
                    <Inputs input={dataset.Title} field={dataset.Field}/>
                    <ResearchMeta research={dataset.ResearchID} dataset={dataset}/>
                </div>
            </div>
        )
    } else if(dataset.Type === 'research-open-question'){
        return (
            <div className={`kpi-data-container ${borderStyle()}`}>
                <div className='kpi-results-container'>
                    <h1><WordCountKPI category={dataset.CategorieID} moment={dataset.MomentID} field={dataset.Field}/></h1>
                    <ResearchMeta research={dataset.ResearchID} dataset={dataset}/>
                </div>
            </div>
        )
    } else if(dataset.Type === 'research-scale-development'){

        const resultsArray = ScaleQuestionResults(dataset.ResearchID ? dataset.ResearchID : '', dataset.Field ? dataset.Field : '')
        
        return  (
            <div className={`kpi-data-container ${borderStyle()}`}>
                <div className='kpi-results-container'>
                    <ResearchResultsGraph results={resultsArray}/>
                    <ResearchMeta research={dataset.ResearchID} dataset={dataset}/>
                </div>
            </div>
        )
    } else if(dataset.Type === 'research-open-question-development'){

        const resultsArray = ScaleQuestionResults(dataset.ResearchID ? dataset.ResearchID : '', dataset.Field ? dataset.Field : '')
        
        return  (
            <div className={`kpi-data-container ${borderStyle()}`}>
                <div className='kpi-results-container'>
                    <ResearchResultsGraph results={resultsArray}/>
                    <ResearchMeta research={dataset.ResearchID} dataset={dataset}/>
                </div>
            </div>
        )
    } else if(dataset.Type === 'research-multiple-moment'){
        return  (
            <div className={`kpi-data-container ${borderStyle()}`}>
                <div className='kpi-results-container'>
                    <MultipleResultsKpi moment={dataset.MomentID} field={dataset.Field.ID} input={dataset.Input} />
                    <ResearchMeta research={dataset.ResearchID} dataset={dataset}/>
                </div>
            </div>
        )
    } else if(dataset.Type === 'output'){
        return  (
            <div className={`kpi-data-container ${borderStyle()}`}>
                <div className='kpi-results-container'>
                    <ManualResultsGraph output={dataset.Output}/>
                </div>
            </div>
        )
    } else if(dataset.Type === 'research-scale-measure-moment'){
        return  (
            <div className={`kpi-data-container ${borderStyle()}`}>
                <div className='kpi-results-container'>
                    <ScaleMeasureMomentKPI moment={dataset.MomentID} field={dataset.Field.ID}/>
                    <ResearchMeta research={dataset.ResearchID} dataset={dataset}/>
                </div>
            </div>
        )
    } 
    else {
        return <div></div>
    }
}

export default KPIDataType
