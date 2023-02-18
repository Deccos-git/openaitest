import LeftSideBarAuthProfile from "../../components/LeftSideBarAuthProfile";
import LeftSideBarAuthProfileFullScreen from "../../components/LeftSideBarAuthProfileFullScreen";
import { useFirestoreUsersApproved, useFirestore, useFirestoreGeneral } from "../../firebase/useFirestore";
import { useHistory } from "react-router-dom";
import { client } from '../../hooks/Client';
import { db, auth } from "../../firebase/config";
import { useState, useContext, useEffect } from "react";
import MenuStatus from "../../hooks/MenuStatus";
import { Auth } from '../../StateManagment/Auth';
import deleteIcon from '../../images/icons/delete-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import ButtonClicked from "../../hooks/ButtonClicked";
import Hostname from '../../hooks/Hostname'
import firebase from "firebase";

const Members = () => {
    const [authO] = useContext(Auth)
    const [showDeleteButton, setShowDeleteButton] = useState("none")
    const [email, setEmail] = useState('')
    const [communityName, setCommunityName] = useState('')
    const [inputValue, setInputValue] = useState(null)
    const [userDocid, setUserDocid] = useState('')

    const docs = useFirestoreUsersApproved(false, true)
    const compagnies = useFirestore("CompagnyMeta")
    const admins = useFirestore('Admins')
    const users = useFirestoreGeneral('Users', 'Email', email)

    const history = useHistory()
    const menuState = MenuStatus()
    const host = Hostname()
    ScrollToTop()
    
    const updateRoute = (e) => {

        const memberID = e.target.id

        history.push(`/${client}/PublicProfile/${memberID}`)
    }

    useEffect(() => {
        compagnies && compagnies.forEach(compagny => {
            setCommunityName(compagny.CommunityName)
        })
 
    }, [compagnies])

    useEffect(() => {
        const showDeleteButtonForAdmin = () => {
            admins && admins.forEach(admin => {
                if(admin.UserID === authO.ID){
                    setShowDeleteButton("block")
                }
            })
        }
        showDeleteButtonForAdmin()
    }, [admins])

    useEffect(() => {
        docs && docs.forEach(item => {
            const docid = item.docid 

            setUserDocid(docid)
        })
    },[docs])

    const deleteUser = (e) => {

        const id = e.target.dataset.id

        db.collection("Users")
        .doc(id)
        .update({
            Deleted: true
        })
    }

    const emailHandler = (e) => {
        const value = e.target.value 

        setEmail(value)
    }

    const inviteMemberHandler = (e) => {

        if(users.length > 0){
            updateExistingMember()
            sendMailToExistingMember()
        } else if(users.length === 0){
            sendMailToNewMember()
        } 

        ButtonClicked(e, 'Uitnodiging verstuurd')

    }

    const updateExistingMember = () => {

        console.log(userDocid, client)

        db.collection('Users')
        .doc(userDocid)
        .update({
            Compagny: firebase.firestore.FieldValue.arrayUnion(client),
        })

    }

    const sendMailToExistingMember = () => {

        db.collection("Email").doc().set({
            to: email,
            cc: "info@deccos.nl",
            from: "info@deccos.nl",
            replyTo: `${host.Name}`,
            message: {
            subject: `${communityName} nodigt je uit om lid te worden van de ${host.Name} ${host.Text} omgeving`,
            html: `
                ${communityName} nodigt je uit om lid te worden van de ${host.Name} ${host.Text} omgeving. <br><br>

                <a href='https://${host.Hostname}/${client}'>Klik hier</a> om naar de omgeving van ${communityName} te gaan.<br><br>

                Met vriendelijke groet, <br><br>

                Team ${host.Name} <br><br>
                
                `,
            Gebruikersnaam: `${client}`,
            Emailadres: email,
            Type: "Invite member"
                }     
        })
    }

    const sendMailToNewMember = () => {

        db.collection("Email").doc().set({
            to: email,
            cc: "info@deccos.nl",
            from: "info@deccos.nl",
            replyTo: `${host.Name}`,
            message: {
            subject: `${communityName} nodigt je uit om lid te worden van de ${host.Name} ${host.Text} omgeving`,
            html: `
                ${communityName} nodigt je uit om lid te worden van de ${host.Name} ${host.Text} omgeving. <br><br>

                <a href='https://${host.Hostname}/${client}/Register'>Klik hier</a> om een account aan te maken.<br><br>

                Met vriendelijke groet, <br><br>

                Team ${host.Name} <br><br>
                
                `,
            Gebruikersnaam: `${client}`,
            Emailadres: email,
            Type: "Invite member"
                }     
        })
    }

    return (
            <div className="main">
                <LeftSideBarAuthProfile />
                <LeftSideBarAuthProfileFullScreen/>
                <div className="main-container" style={{display: menuState}}>
                    <div className="profile-inner-container">
                        <div className="card-header">
                            <h1>Team</h1>
                            <p>Beheer de teamleden van {communityName}</p>
                        </div>
                        <h2>Teamlid uitnodigen</h2>
                        <p>Emailadres</p>
                        <input type="text" placeholder='Noteer hier het emailadres' onChange={emailHandler} />
                        <div className='button-container button-container-invite-members'>
                            <button onClick={inviteMemberHandler}>Uitnodigen</button>
                        </div>
                        <h2>Teamleden</h2>
                        {docs && docs.map(doc => (
                        <div id="members-container" key={doc.ID}>
                            <img src={doc.Photo} alt="" id={doc.ID} onClick={updateRoute} />
                            <h3 id={doc.ID} onClick={updateRoute}>{doc.UserName}</h3>
                            <img src={deleteIcon} alt="" style={{display: showDeleteButton}} className="userrole-users-delete-button" data-id={doc.docid} onClick={deleteUser} />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default Members