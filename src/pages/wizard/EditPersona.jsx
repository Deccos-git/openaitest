import LeftSideBar from "../../components/LeftSideBar"
import LeftSideBarFullScreen from "../../components/LeftSideBarFullScreen"
import MenuStatus from "../../hooks/MenuStatus";
import arrowLeft from '../../images/icons/arrow-left-icon.png'
import arrowRight from '../../images/icons/arrow-right-icon.png'
import capIcon from '../../images/icons/cap-icon.png'
import rocketIcon from '../../images/icons/rocket-icon.png'
import bulbIcon from '../../images/icons/bulb-icon.png'
import feetIcon from '../../images/icons/feet-icon.png'
import { useFirestoreID, useFirestore } from "../../firebase/useFirestore";
import { useState, useEffect, useContext, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { client } from '../../hooks/Client';
import { db, timestamp } from "../../firebase/config.js"
import { useHistory } from "react-router-dom";
import deleteIcon from '../../images/icons/delete-icon.png'
import plusButton from '../../images/icons/plus-icon.png'
import EditIcon from "../../images/icons/edit-icon.png";
import {ReactComponent as QuestionIcon}  from '../../images/icons/question-icon.svg'
import uuid from "react-uuid";
import ImpactGuideMenu from "../../hooks/ImpactGuideMenu";
import dashboardIcon from '../../images/icons/dashboard-icon.png'
import eyeIcon from '../../images/icons/eye-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import { SavedIcon } from "../../StateManagment/SavedIcon";
import Location from "../../hooks/Location"
import firebase from 'firebase'
import { bucket } from '../../firebase/config';
import PersonaStep from "../../components/personas/PersonaStep";
import ConnectedOutput from "../../components/personas/ConnectedOutput";
import ConnectedMkba from "../../components/personas/ConnectedMkba";
import {useDrag, useDrop} from 'react-dnd';

const EditPersona = () => {
    const [saved, setSaved] = useContext(SavedIcon)

    const ref = useRef(null)

    const [editOutput, setEditOutput] = useState('none')
    const [editMKBA, setEditMKBA] = useState('none')

    const route = Location()[3]
    const menuState = MenuStatus()
    ScrollToTop()
    const history = useHistory()

    const personas = useFirestoreID('Personas', route)
    const outputs = useFirestore('Outputs')
    const mkbas = useFirestore('SROISets')

    const nameHandler = (e) => {

        const docid = e.target.dataset.docid
        const value = e.target.value

        db.collection('Personas')
        .doc(docid)
        .update({
            Name: value
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const photoHandler = (e) => {

        const photo = e.target.files[0]
        const docid = e.target.dataset.docid

        const storageRef = bucket.ref("/ProfilePhotos/" + photo.name);
        const uploadTask = storageRef.put(photo)

        uploadTask.then(() => {
          
            uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING:
                console.log('Upload is running');
                break;
            }
            }, (err) => {
                alert(err)
            }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);

            db.collection('Personas')
            .doc(docid)
            .update({
                Photo: downloadURL
            })
            .then(() => {
                setSaved('flex')
             })

                })
            })
        })
    }  

    const addStep = (e) => {

        const personaID = e.target.dataset.persona

        db.collection('PersonaSteps')
        .doc()
        .set({
            ID: uuid(),
            Compagny: client,
            CompagnyID: client,
            Timestamp: timestamp,
            PersonaID: personaID,
            Position: ''
        })
    }

    const outputHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid

        db.collection('Personas')
        .doc(docid)
        .update({
            Output: value
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const mkbaHandler = (e) => {

        const value = e.target.options[e.target.selectedIndex].value
        const docid = e.target.dataset.docid

        db.collection('Personas')
        .doc(docid)
        .update({
            Mkba: value
        })
        .then(() => {
            setSaved('flex')
         })

    }

    const [{isDragging}, drag] = useDrag({
        item: {type: 'my-item'},
        type: 'BOX',
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        console
      });
    
      const [, drop] = useDrop({
        accept: 'my-item',
        hover(item, monitor){
            if(!ref.current){
                return
            }
        const dragIndex = item.index
        const hoverIndex = 'index'
        },
        drop: () => {
          // Handle drop action here
        },
      });

      const OutputActivity = ({output}) => {

        const activities = useFirestoreID('Activities', output.ID)

        console.log(activities)

          return(
              <p>'Test'</p>
          )
      }

  return (
    <div className="main">
    <LeftSideBar />
    <LeftSideBarFullScreen/>
    <div className="main-container" style={{display: menuState}}>
        <div className="page-header">
            <h1>Persona aanpassen</h1>
            <div className='wizard-sub-nav'>
                <NavLink to={`/${client}/addpersonas`} >
                    <div className='step-container'>
                        <img src={arrowLeft} alt="" />
                        <p>Personas</p>
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
                    <p><b>Persona's brengen je impact tot leven.</b></p>
                    <p>Aan de hand van personas kun je jullie impact op individueel niveau laten zien. Laat zien welk verschil jullie maken in het leven van de jullie doelgroep.</p>
                    
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={rocketIcon} alt="" />
                    <h3>Aan de slag</h3>
                </div> 
                <div className='text-section'>
                    {personas && personas.map(item => (
                       <div key={item.ID} ref={(node) => drag(drop(node))}>
                           <p><b>Naam</b></p>
                           <input type="text" defaultValue={item.Name} data-docid={item.docid} onChange={nameHandler}/>
                           <p><b>Foto</b></p>
                           <img className='persona-image' src={item.Photo} alt="" />
                           <input type="file" data-docid={item.docid} onChange={photoHandler}/>
                           <p><b>Koppel output</b></p>
                           <div className='edit-type-container'>
                                <ConnectedOutput persona={item}/>
                                <img src={EditIcon} alt="" onClick={() => editOutput === 'none' ? setEditOutput('block') : setEditOutput('none')}/>
                            </div>
                           <select name="" id="" data-docid={item.docid} defaultValue={item.Output} onChange={outputHandler} style={{display:editOutput}}>
                                <option value="">-- Selecteer output --</option>
                                {outputs && outputs.map(item => (
                                    <option key={item.ID} value={item.ID}>{item.Title} (activiteit: {item.Activity})</option>
                                ))}
                           </select>
                           <p><b>Koppel MKBA</b></p>
                           <div className='edit-type-container'>
                                <ConnectedMkba persona={item}/>
                                <img src={EditIcon} alt="" onClick={() => editMKBA === 'none' ? setEditMKBA('block') : setEditMKBA('none')}/>
                            </div>
                           <select name="" id="" data-docid={item.docid} onChange={mkbaHandler} style={{display:editMKBA}}>
                                <option value="">-- Selecteer mkba --</option>
                                {mkbas && mkbas.map(item => (
                                    <option key={item.ID} value={item.ID}>{item.Title}</option>
                                ))}
                           </select>
                           <p><b>Ontwikkeling</b></p>
                           <div className='add-step-container'>
                               <img src={plusButton} alt="" data-persona={item.ID} onClick={addStep} />
                               <p onClick={addStep} data-persona={item.ID}>Stap toevoegen</p>
                           </div>
                           <div>
                               <PersonaStep persona={item}/>
                           </div>
                       </div>
                   ))}
                </div>
            </div>
            <div>
                <div className='activity-meta-title-container'>
                    <img src={eyeIcon} alt="" />
                    <h3>Bekijk</h3>
                </div> 
                <div className='text-section'>
                    <p><b>Je kunt je personas hier terug vinden:</b></p>
                    <div className="channel-inner-div">
                        <div className='activity-meta-title-container'>
                            <img src={dashboardIcon} alt="" />
                            <NavLink activeClassName='active' to={`/${client}/personas`}>Personas</NavLink>
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
            <div>
                <div className='activity-meta-title-container'>
                    <img src={feetIcon} alt="" />
                    <h3>Volgende stap</h3>
                </div> 
                <div className='text-section'>
                    <p>In de volgende stap ga je mijlpalen stellen voor je outputs.</p>
                    <NavLink to={`/${client}/MeasureOutput`} ><button>Volgende stap</button></NavLink>
                </div>
            </div>
        </div> 
    </div>
</div>
  )
}

export default EditPersona