import { useFirestoreAnalysisCategories, useFirestoreAnalysisTotalWords } from "../../../firebase/useFirestore"
import GroupBy from "../../../hooks/GroupBy";
import SaveDatapoint from "../../datapoints/SaveDatapoint";

const DifferenceOpenQuestions = ({field, researchID}) => {

    const categories = useFirestoreAnalysisCategories(field.ID)

    const Words = ({categoryID}) => {
        const words = useFirestoreAnalysisTotalWords(categoryID)

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

        // Get the difference between the first and last average score

    const firstNumber = graphArray[0]?.count
    const lastNumber = graphArray[graphArray.length-1]?.count

    const difference = lastNumber - firstNumber

    console.log(difference)

        return <div>{difference}</div>

    }

  return (
    <>
        {categories && categories.map(item => (
            <div className='multiple-moment-item-container'>
                <p>{item.Categorie}</p>
                <Words categoryID={item.ID} categoryTitle={item.Categorie}/>
                <SaveDatapoint field={field} title={item.Categorie} type={"research-open-question-difference"} researchID={researchID} categorie={item.Categorie}/>
            </div>
        ))}
    </>
  )
}

export default DifferenceOpenQuestions