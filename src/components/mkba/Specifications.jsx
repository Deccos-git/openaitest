import { 
    useFirestoreSROISpecifications, 
} from "../../firebase/useFirestore";
import { db } from "../../firebase/config.js"
import SpecificationDetail from './SpecificationDetail';

const Specifications = ({item}) => {
  
    // All specifications that have this item id as the parentid
    const spec = useFirestoreSROISpecifications(item.ID)

    // Total amount of parent item
    const totalAmount = () => {
        

        if(spec.length > 0){
            let sum = 0
            spec && spec.forEach(item => {

                if(item.Currency === 'times'){
                    sum = sum * item.Amount
                } else if(item.Currency === 'euro'){
                    sum += item.Amount
                } else if(item.Currency === 'percentage'){
                    sum = sum / 100 * item.Amount
                } else if(item.Currency === 'output'){
                    sum = sum * item.Amount
                }
                
            })
    
            db.collection('SROIs')
            .doc(item.docid)
            .update({
                Amount: Number((Math.round(sum * 100) / 100).toFixed(2))
            })
        }
        
    }

    totalAmount() 

    return(
        <div className='sroi-spec-container'>
            {spec && spec.map(i => (
                <div key={i.ID}>
                    <div className='spec-detail-container'>
                        <SpecificationDetail i={i} costBenefit={item}/>
                    </div>
                    <Specifications item={i} />
                </div>
            ))}
        </div>
    )
}

export default Specifications