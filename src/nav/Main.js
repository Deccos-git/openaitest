import "../CSS/index.css";
import Goals from '../pages/dashboard/Goals';
import { Switch, Route } from "react-router-dom";
import Search from '../pages/topbar/Search';
import Register from "../pages/auth/Register";
import Profile from "../pages/auth/Profile";
import GoalDetail from "../pages/dashboard/GoalDetail";
import { client } from '../hooks/Client';
import Notifications from '../pages/topbar/Notifications';
import Settings from '../pages/admin/Settings';
import Members from '../pages/admin/Members';
import Login from '../pages/auth/Login';
import LeftSideBarFullScreen from '../components/LeftSideBarFullScreen'
import UserRoles from '../pages/admin/UserRoles';
import NotApproved from '../pages/auth/NotApproved';
import Activities from '../pages/dashboard/Activities'
import ActivityDetail from '../pages/dashboard/ActivityDetail'
import TaskDetail from '../pages/projectmanagement/TaskDetail'
import Tasks from '../pages/projectmanagement/Tasks'
import QuestionnaireSettings from '../pages/wizard/QuestionnaireSettings';
import AddQuestionnaire from '../pages/wizard/AddQuestionnaire';
import Stakeholders from '../pages/dashboard/Stakeholders';
import StakeholderAnalysis from '../pages/wizard/StakeholderAnalysis';
import ImpactProgress from '../pages/dashboard/ImpactProgress';
import Impacthub from '../pages/dashboard/Impacthub';
import AddMilestone from '../pages/wizard/AddMilestone';
import MilestoneSettings from '../pages/dashboard/MilestoneSettings';
import OutputSettings from '../pages/dashboard/OutputSettings';
import AddOutput from '../pages/wizard/AddOutput';
import SROI from '../pages/dashboard/SROI';
import AddSROI from '../pages/wizard/AddSROI';
import Introduction from '../pages/wizard/Introduction'
import GoalTitle from '../pages/wizard/GoalTitle';
import ProblemAnalysis from '../pages/wizard/ProblemAnalysis';
import ProblemAnalysisDetail from '../pages/dashboard/ProblemAnalyseDetail';
import Explainer from '../pages/wizard/Explainer';
import Targetgroup from '../pages/wizard/Targetgroup';
import ImpactTargetgroup from '../pages/wizard/ImpactTargetgroup';
import ImpactSociety from '../pages/wizard/ImpactSociety';
import SDGs from '../pages/wizard/SDGs';
import Assumptions from '../pages/wizard/Assumptions';
import Conditions from '../pages/wizard/Conditions';
import AddActivity from '../pages/wizard/AddActivity';
import ImpactActivity from '../pages/wizard/ImpactActivity';
import OutputEffects from '../pages/wizard/OutputEffects';
import MeasureOutput from '../pages/wizard/MeasureOutput';
import Impactclub from '../pages/wizard/Impactclub'
import Projectmanagement from '../pages/wizard/Projectmanagement';
import Questionnaires from '../pages/wizard/Questionnaires';
import Research from '../pages/wizard/Research';
import ResearchAnalyses from '../pages/wizard/ResearchAnalyses';
import ResearchOverview from '../pages/wizard/ResearchOverview'
import Agenda from '../pages/projectmanagement/Agenda';
import ImpactGroup from '../pages/projectmanagement/ImpactGroup';
import ResearchSettings from '../pages/dashboard/ResearchSettings';
import NewClient from '../pages/admin/NewClient';
import AddOpenSourceQuestionnaire from '../pages/wizard/AddOpenSourceQuestionnaire';
import Home from '../pages/dashboard/Home';
import OpenSourceQuestionnaire from '../pages/wizard/OpenSourceQuestionnaire';
import TheoryOfChange from '../pages/dashboard/TheoryOfChange';
import Share from '../pages/admin/Share';
import SDGDetail from '../pages/dashboard/SDGDetail';
import CreateSROI from '../pages/wizard/CreateSROI';
import Sroidetail from '../pages/dashboard/Sroidetail';
import AddPersonas from "../pages/wizard/AddPersonas";
import EditPersona from "../pages/wizard/EditPersona";
import Personas from "../pages/dashboard/Personas";
import PersonaDetail from "../pages/dashboard/PersonaDetail";
import AnalyseCategory from "../pages/wizard/AnalyseCategory";
import OutputDetail from "../pages/dashboard/OutputDetail";
import DashboardPersonaDetail from "../pages/dashboard/DashboardPersonaDetail";
import KPIs from "../pages/wizard/KPIs";
import ResearchResults from "../pages/dashboard/ResearchResults";
import KpiOverview from "../pages/dashboard/KpiOverview";
import SelectDatapoints from "../pages/wizard/SelectDatapoint";
import EffectsOverview from "../pages/dashboard/EffectsOverview";

const Main = () => {

    return (
        <>
            <Switch>
                <Route exact path={`/`}>
                    <Login/>
                </Route>
                <Route path={`/NewClient`}>
                    <NewClient/>
                </Route>
                <Route path={`/${client}/NotApproved`}>
                    <NotApproved/>
                </Route>
                <Route exact path={`/${client}`}>
                    <Home/>
                </Route>
                <Route path={`/${client}/Home`}>
                    <Home/>
                </Route>
                <Route path={`/${client}/Login`}>
                    <Login/>
                </Route>
                <Route path={`/${client}/Register`}>
                    <Register/>
                </Route>
                <Route path={`/${client}/Goals`}>
                    <Goals/>
                </Route>
                <Route path={`/${client}/Activities`}>
                    <Activities/>
                </Route>
                <Route path={`/${client}/ActivityDetail`}>
                    <ActivityDetail/>
                </Route>
                <Route path={`/${client}/Tasks`}>
                    <Tasks/>
                </Route>
                <Route path={`/${client}/TaskDetail`}>
                    <TaskDetail/>
                </Route>
                <Route path={`/${client}/OutputSettings`}>
                    <OutputSettings/>
                </Route>
                <Route path={`/${client}/AddOutput`}>
                    <AddOutput/>
                </Route>
                <Route path={`/${client}/MilestoneSettings`}>
                    <MilestoneSettings/>
                </Route>
                <Route path={`/${client}/AddMilestone`}>
                    <AddMilestone/>
                </Route>
                <Route path={`/${client}/LeftSideBarFullScreen`}>
                    <LeftSideBarFullScreen/>
                </Route>
                <Route path={`/${client}/ImpactProgress`}>
                    <ImpactProgress/>
                </Route>
                <Route path={`/${client}/SROI`}>
                    <SROI/>
                </Route>
                <Route path={`/${client}/AddSROI`}>
                    <AddSROI/>
                </Route>
                <Route path={`/${client}/Impacthub`}>
                    <Impacthub/>
                </Route>
                <Route path={`/${client}/Search`}>
                    <Search/>
                </Route>
                <Route path={`/${client}/Profile`}>
                    <Profile/>
                </Route>
                <Route path={`/${client}/GoalDetail`}>
                    <GoalDetail/>
                </Route>
                <Route path={`/${client}/QuestionnaireSettings`}>
                    <QuestionnaireSettings/>
                </Route>
                <Route path={`/${client}/AddQuestionnaire`}>
                    <AddQuestionnaire/>
                </Route>
                <Route path={`/${client}/OpenSourceQuestionnaire`}>
                    <OpenSourceQuestionnaire/>
                </Route>
                <Route path={`/${client}/Stakeholders`}>
                    <Stakeholders/>
                </Route>
                <Route path={`/${client}/StakeholderAnalysis`}>
                    <StakeholderAnalysis/>
                </Route>
                <Route path={`/${client}/UserRoles`}>
                    <UserRoles/>
                </Route>
                <Route path={`/${client}/Notifications`}>
                    <Notifications/>
                </Route>
                <Route path={`/${client}/Settings`}>
                    <Settings/>
                </Route>
                <Route path={`/${client}/Members`}>
                    <Members/>
                </Route>
                <Route path={`/${client}/Introduction`}>
                    <Introduction />
                </Route>
                <Route path={`/${client}/GoalTitle`}>
                    <GoalTitle />
                </Route>
                <Route path={`/${client}/ProblemAnalysis`}>
                    <ProblemAnalysis />
                </Route>
                <Route path={`/${client}/ProblemAnalysisDetail`}>
                    <ProblemAnalysisDetail />
                </Route>
                <Route path={`/${client}/Explainer`}>
                    <Explainer />
                </Route>
                <Route path={`/${client}/Targetgroup`}>
                    <Targetgroup />
                </Route>
                <Route path={`/${client}/ImpactTargetgroup`}>
                    <ImpactTargetgroup />
                </Route>
                <Route path={`/${client}/ImpactSociety`}>
                    <ImpactSociety />
                </Route>
                <Route path={`/${client}/SDGs`}>
                    <SDGs />
                </Route>
                <Route path={`/${client}/Assumptions`}>
                    <Assumptions />
                </Route>
                <Route path={`/${client}/Conditions`}>
                    <Conditions />
                </Route>
                <Route path={`/${client}/AddActivity`}>
                    <AddActivity />
                </Route>
                <Route path={`/${client}/ImpactActivity`}>
                    <ImpactActivity />
                </Route>
                <Route path={`/${client}/OutputEffects`}>
                    <OutputEffects />
                </Route>
                <Route path={`/${client}/MeasureOutput`}>
                    <MeasureOutput />
                </Route>
                <Route path={`/${client}/Impactclub`}>
                    <Impactclub />
                </Route>
                <Route path={`/${client}/Projectmanagement`}>
                    <Projectmanagement/>
                </Route>
                <Route path={`/${client}/Questionnaires`}>
                    <Questionnaires/>
                </Route>
                <Route path={`/${client}/Research`}>
                    <Research/>
                </Route>
                <Route path={`/${client}/Researchoverview`}>
                    <ResearchOverview/>
                </Route>
                <Route path={`/${client}/ResearchAnalyses`}>
                    <ResearchAnalyses/>
                </Route>
                <Route path={`/${client}/Agenda`}>
                    <Agenda/>
                </Route>
                <Route path={`/${client}/ImpactGroup`}>
                    <ImpactGroup/>
                </Route>
                <Route path={`/${client}/ResearchSettings`}>
                    <ResearchSettings/>
                </Route>
                <Route path={`/${client}/AddOpenSourceQuestionnaire`}>
                    <AddOpenSourceQuestionnaire/>
                </Route>
                <Route path={`/${client}/TheoryOfChange`}>
                    <TheoryOfChange/>
                </Route>
                <Route path={`/${client}/Share`}>
                    <Share/>
                </Route>
                <Route path={`/${client}/SDGDetail`}>
                    <SDGDetail/>
                </Route>
                <Route path={`/${client}/CreateSROI`}>
                    <CreateSROI/>
                </Route>
                <Route path={`/${client}/sroidetail`}>
                    <Sroidetail/>
                </Route>
                <Route path={`/${client}/addpersonas`}>
                    <AddPersonas/>
                </Route>
                <Route path={`/${client}/editpersona`}>
                    <EditPersona/>
                </Route>
                <Route path={`/${client}/personas`}>
                    <Personas/>
                </Route>
                <Route path={`/${client}/personadetail`}>
                    <PersonaDetail/>
                </Route>
                <Route path={`/${client}/analysecategory`}>
                    <AnalyseCategory/>
                </Route>
                <Route path={`/${client}/outputdetail`}>
                    <OutputDetail/>
                </Route>
                <Route path={`/${client}/dashboardpersonadetail`}>
                    <DashboardPersonaDetail/>
                </Route>
                <Route path={`/${client}/kpis`}>
                    <KPIs/>
                </Route>
                <Route path={`/${client}/kpioverview`}>
                    <KpiOverview/>
                </Route>
                <Route path={`/${client}/ResearchResults`}>
                    <ResearchResults/>
                </Route>
                <Route path={`/${client}/selectdatapoint`}>
                    <SelectDatapoints/>
                </Route>
                <Route path={`/${client}/effectsoverview`}>
                    <EffectsOverview/>
                </Route>
            </Switch>
        </>
    )
}

export default Main
