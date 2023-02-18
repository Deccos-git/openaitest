import uuid from "react-uuid";
import { db } from "../../firebase/config";
import deleteIcon from '../../images/icons/delete-icon.png'
import firebase from "firebase";
import { useFirestoreAnalysisWords } from "../../firebase/useFirestore";
import { useEffect } from "react";

const CategoryWords = ({category, field, moment, setSelectedWords}) => {

    const words = useFirestoreAnalysisWords(field, moment, category.ID)

    const deleteWord = (e) => {
        const docid = e.target.dataset.docid

        db.collection('AnalysisWords')
        .doc(docid)
        .delete()
    }

    useEffect(() => {
        setSelectedWords(words)
    },[words])

  return (
      <div>
          {words.length === 0 ? 
            <p>Selecteer woorden voor deze categorie</p>
            :
            <ul>
                {words && words.map(item => (
                    <li key={item.ID} className='selected-words-container'>
                       {item.Word}
                       <img src={deleteIcon} alt="" data-docid={item.docid} onClick={deleteWord} /> 
                    </li>
                ))}
            </ul>
        }
      </div>
     
  )
}

export default CategoryWords