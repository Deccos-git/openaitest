import { useFirestore } from "../../firebase/useFirestore";
import { PieChart, Pie, Cell} from 'recharts';

const ProfileCompleteness = () => {

    const profile = useFirestore('CompagnyMeta')
    const indirectCauses = useFirestore('IndirectCauses')
    const directCauses = useFirestore('DirectCauses')
    const centralProblem = useFirestore('CentralProblem')
    const directConsequences = useFirestore('DirectConsequences')
    const indirectConsequences = useFirestore('IndirectConsequences')
    const stakeholders = useFirestore('Stakeholders')
    const goals = useFirestore('Goals')
    const targetgroups = useFirestore('Targetgroups')
    const assumptions = useFirestore('Assumptions')
    const conditions = useFirestore('Conditions')
    const sdgs = useFirestore('SDGsSelected')
    const activities = useFirestore('Activities')
    const outputs = useFirestore('Outputs')
    const outputEffects = useFirestore('OutputEffects')
    const sroi = useFirestore('SROIs')
    const milestones = useFirestore('Milestones')
    const questionnaires = useFirestore('Questionnaires')
    const research = useFirestore('Research')
    const conclusions = useFirestore('Conclusions')
    const personas = useFirestore('Personas')

    const currentProgressArray = []

    const addToProgress = (step, title) => {
        if(step.length > 0){
            currentProgressArray.push([`${title}`])
        } else{
            return
        }
    }

    addToProgress(profile, 'profile')
    addToProgress(indirectCauses, 'indirectCauses')
    addToProgress(directCauses, 'directCauses')
    addToProgress(centralProblem, 'centralProblem')
    addToProgress(directConsequences, 'directConsequences')
    addToProgress(indirectConsequences, 'indirectConsequences')
    addToProgress(stakeholders, 'stakeholders')
    addToProgress(goals, 'goals')
    addToProgress(conditions, 'conditions')
    addToProgress(assumptions, 'assumptions')
    addToProgress(targetgroups, 'targetgroup')
    addToProgress(sdgs, 'sdgs')
    addToProgress(activities, 'activities')
    addToProgress(outputs, 'outputs')
    addToProgress(outputEffects, 'outputEffects')
    addToProgress(sroi, 'sroi')
    addToProgress(milestones, 'milestones')
    addToProgress(questionnaires, 'questionnaires')
    addToProgress(research, 'research')
    addToProgress(conclusions, 'conclusions')
    addToProgress(personas, 'personas')

    const currentProgress = currentProgressArray.length
    const totalProgress = 21 - currentProgress 

    const data = [
        { id: "1", name: "L1", value: totalProgress },
        { id: "2", name: "L2", value: currentProgress }
        ];
    
    const progress = `${Math.round(currentProgress * 100 / 21 ) }%`


  return (
    <PieChart width={250} height={250}>
        <text
        x={130}
        y={130}
        textAnchor="middle"
        dominantBaseline="middle"
        >
        {progress}
        </text>
        <Pie
        data={data}
        dataKey="value"
        innerRadius="80%"
        outerRadius="100%"
        fill="green"
        startAngle={90}
        endAngle={-270}
        paddingAngle={0}
        cornerRadius={5}
        >
        <Cell
        key="test"
        fill="#CCC"
        />
        </Pie>
    </PieChart>
  )
}

export default ProfileCompleteness