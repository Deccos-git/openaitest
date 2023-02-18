import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import eyeIcon from '../../images/icons/eye-icon.png'
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import Location from "../../hooks/Location"
import {useFirestoreID, useFirestoreQuestionnairesResponses} from "../../firebase/useFirestore";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import deleteIcon from '../../images/icons/delete-icon.png'
import { db, timestamp } from "../../firebase/config.js"
import firebase from "firebase";
import CategoryWords from "../../components/reserachAnalyses/CategoryWords";

const AnalyseCategory = () => {
    const [categoryName, setCategoryName] = useState('')
    const [fieldName, setFieldName] = useState('')
    const [allWords, setAllWords] = useState([])
    const [selectedWords, setSelectedWords] = useState([])

    const category = Location()[3]
    const moment = Location()[4]
    const field = Location()[5]
    const menuState = MenuStatus()

    const results = useFirestoreQuestionnairesResponses(field, moment)
    const categories = useFirestoreID('AnalysisCategories', category)
    const fields = useFirestoreID('QuestionnaireFields', field) 

    // Find category name
    useEffect(() => {
        categories && categories.forEach(item => {
            setCategoryName(item.Categorie)
        })
    },[categories])

    // Find field question
    useEffect(() => {
        fields && fields.forEach(item => {
            console.log(item)
            setFieldName(item.Question)
        })
    },[fields])

    // Combine all results into one object
    useEffect(() => {
        const wordArray = []
        results && results.forEach(item => {
            console.log(results)
            const words = item.Input.split(" ")

            words && words.forEach(word => {
                wordArray.push(word)
            })
        })

        setAllWords(wordArray)
    },[results])

    const filterHandler = (e) => {
        const value = e.target.value 

        if(allWords.includes(value)){
            console.log(allWords)
        }
    }

    const onMouseEnter = (e) => {
        e.target.style.backgroundColor = '#f48183'
    }

    const onMouseLeave = (e) => {
        e.target.style.backgroundColor = 'inherit'
    }

    const selectWord = (e) => {
        const word = e.target.dataset.word 

        db.collection('AnalysisWords')
        .doc()
        .set({
            Word: word,
            CategoryID: category,
            MomentID: moment,
            FieldID: field,
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
        })
    }

    console.log(selectedWords)

    const isSelected = (item) => {

        let word = ''

        selectedWords && selectedWords.forEach(i => {
            if(i.Word === item){
                word = item
            }
        })

        if(word === item){
            return 'selected-word'
        }

    }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Analyseer categorie {categoryName}</h1>
            <p>Vraag {fieldName}</p>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/ResearchAnalyses`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Onderzoeksanalyses</p>
                    </div>
                </NavLink>  
            </div>
        </div>
        <div className='profile profile-auth-profile'>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={capIcon} alt="" />
                    <h3>Uitleg</h3>
                </div> 
                <div className='text-section'>
                    <p><b>
                    Analyseer de categorie {categoryName} voor de vraag {fieldName}.
                    </b></p>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Geselecteerde woorden</b></p>
                    {categories && categories.map(item => (
                        <CategoryWords 
                        category={item} 
                        field={field} 
                        moment={moment}
                        setSelectedWords={setSelectedWords}
                        />
                    ))}
                    {/* <p><b>Zoek woord</b></p>
                    <input type="text" onChange={filterHandler} /> */}
                    <p><b>Alle woorden</b></p>
                    <div className='analyse-category-words-container'>
                        {allWords && allWords.map(item => (
                            <p 
                            className={`analyse-category-word ${isSelected(item)}`} 
                            key={uuid()} 
                            data-word={item}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onClick={selectWord}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={eyeIcon} alt="" />
                    <h3>Bekijk</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Je kunt je aannames hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={dashboardIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/ImpactProgress`}>Dashboard</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={bulbIcon} alt="" />
                    <h3>Tips</h3>
                </div> 
                <div className='text-section'>
                    <ol>
                        <li>Benieuwd naar de impact van andere sociale MKB'ers? Neem eens een kijkje in de <a href="https://deccos.nl/Milestones">Deccos Impactclub</a>.</li>
                    </ol>
                </div>
            </div>
        </div> 
    </div>
</div>
  )
}

export default AnalyseCategory