import { useFirestoreAnalysisCategories} from '../../firebase/useFirestore'
import SaveDatapoint from '../datapoints/SaveDatapoint';
import WordCount from '../reserachAnalyses/measureMoment/WordCount';

const AnalyseDashboard = ({field, moment, researchID}) => {

    const categories = useFirestoreAnalysisCategories(field.ID && field.ID)

  return (
    <div>
        <div>
            {categories && categories.map(item => (
                <div key={item.ID} className='category-container'>
                    <div className='add-category-container'>
                        <div>
                            <p><b>Categorie</b></p>
                            <p>{item.Categorie}</p> 
                        </div>
                        <div>
                            <p><b>Totaal</b></p>
                            <div className='add-category-container'>
                                <WordCount category={item.ID} moment={moment.ID} field={field.ID}/>
                            </div>
                        </div>
                    </div>
                    <SaveDatapoint field={field} type={'research-open-question'} researchID={researchID} title={item.Categorie} moment={moment.ID} categorie={item.ID}/>
                </div>
            ))}
        </div>
       
    </div>
  )
}

export default AnalyseDashboard