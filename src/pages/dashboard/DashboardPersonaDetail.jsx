import { useFirestoreID } from "../../firebase/useFirestore"
import Location from "../../hooks/Location"

const DashboardPersonaDetail = () => {

    const route = Location()[3]

    const personas = useFirestoreID('Personas', route) 

    console.log(personas)

  return (
    <div>DashboardPersonaDetail</div>
  )
}

export default DashboardPersonaDetail