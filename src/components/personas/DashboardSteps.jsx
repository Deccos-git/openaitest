import { useFirestorePersonaSteps } from "../../firebase/useFirestore"
import DashboardStep from "./DashboardStep"

const DashboardSteps = ({persona}) => {

    const steps = useFirestorePersonaSteps(persona.ID)

  return (
    <div>
        {steps && steps.map((item, index) => (
            <DashboardStep step={item} persona={persona} index={index}/>
        ))}
    </div>
  )
}

export default DashboardSteps