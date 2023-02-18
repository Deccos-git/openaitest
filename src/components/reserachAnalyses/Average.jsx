 import { useFirestore, useFirestoreGeneral } from "../../firebase/useFirestore";

const Avarage = ({research}) => {

    const measureMoments = useFirestoreGeneral('MeasureMoments', 'ResearchID', research.ID)

    measureMoments && measureMoments.forEach(item => {

        
        
    })

   

    return(
        <div>
           
        </div>
    )
}

export default Avarage