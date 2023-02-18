import { useFirestoreAnalysisCategories, useFirestoreAnalysisTotalWords, useFirestoreMeasureMoments } from "../../../firebase/useFirestore"
import OpenQuestionGraph from "../graphs/OpenQuestionGraph";
import GroupBy from "../../../hooks/GroupBy";
import SaveDatapoint from "../../datapoints/SaveDatapoint";

const OpenQuestionDevelopment = ({field, researchID}) => {

    const categories = useFirestoreAnalysisCategories(field.ID)

    const Moments = ({graphArray}) => {
        const moments = useFirestoreMeasureMoments(researchID)

        const momentCount = (id) => {

            console.log(graphArray.length)

            if(graphArray.length > 0){
                graphArray.forEach(arrayItem => {
                    if(arrayItem.moment === id){
                        return arrayItem.count
                    } else {
                        return 0
                    }
                })
            } else {
                return 0
            }
   
        }

        const momentArray = []

        moments && moments.forEach(item => {

            const momentObject = {
                moment: item.Title,
                count: momentCount(item.ID)
            }

            momentArray.push(momentObject)
        })

        console.log(momentArray)

        return(
            <div>
                <OpenQuestionGraph results={momentArray} />
            </div>
        )

    }

    const Words = ({category}) => {
        const words = useFirestoreAnalysisTotalWords(category)

        const wordsArray = []

        words && words.forEach(item => {
            const object = {
                moment: item.MomentID, 
                count: words.length
            }

            wordsArray.push(object)
        })

        // Group wordsarray by moment
        const array = Object.entries(GroupBy(wordsArray, 'moment')) 

        // Structure grouped array for graph

        const graphArray = []

        array && array.forEach(item => {
            const object =  {
                moment: '',
                count: item[1].length
            }

            graphArray.push(object)

        })

        return(
            <div>
                <Moments graphArray={graphArray}/>
            </div>
            
        )

    }

    console.log(researchID)

  return (
    <div>
        {categories && categories.map(item => (
            <div className='multiple-moment-item-container'>
                <p>{item.Categorie}</p>
                <Words category={item.ID}/>
                <SaveDatapoint field={field} type={'research-open-question-development'} researchID={researchID} title={item.Categorie} input={item.Categorie}/>
            </div>
        ))}
    </div>
  )
}

export default OpenQuestionDevelopment