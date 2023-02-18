import LeftSideBarAuthProfile from "../../components/LeftSideBarAuthProfile";
import LeftSideBarAuthProfileFullScreen from "../../components/LeftSideBarAuthProfileFullScreen";
import { useFirestoreUsers, useFirestore, useFirestoreID } from "../../firebase/useFirestore";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import MenuStatus from "../../hooks/MenuStatus";
import { client } from '../../hooks/Client';
import deleteIcon from '../../images/icons/delete-icon.png'
import ScrollToTop from "../../hooks/ScrollToTop";
import Location from "../../hooks/Location"
import Hostname from '../../hooks/Hostname'

const UserRoles = () => {
    const [adminID, setAdminID] = useState("")
    const [adminName, setAdminName] = useState("")
    const [adminPhoto, setAdminPhoto] = useState("")
    const [adminEmail, setAdminEmail] = useState("")
    const [communityName, setCommunityName] = useState('')
    const [communityLogo, setCommunityLogo] = useState('')

    const route = Location()[2]
    const host = Hostname()

    const users = useFirestoreUsers(false)
    const admins = useFirestore('Admins')
    const compagny = useFirestore('CompagnyMeta', route)

    // Set compagnyname in state
    useEffect(() => {
        compagny && compagny.forEach(item => {
            const name = item.Compagny 
            setCommunityName(name)
        })
    },[compagny])

    const menuState = MenuStatus()
    ScrollToTop()

    const deleteAdmin = (e) => {

        const id = e.target.dataset.id

        db.collection("Admins")
        .doc(id)
        .delete()
    }

    const adminHandler = (e) => {
        const id = e.target.options[e.target.selectedIndex].dataset.id
        const photo = e.target.options[e.target.selectedIndex].dataset.photo
        const username = e.target.options[e.target.selectedIndex].dataset.name
        const email = e.target.options[e.target.selectedIndex].dataset.email

        setAdminID(id)
        setAdminName(username)
        setAdminPhoto(photo)
        setAdminEmail(email)
    }

    const addAdmin = (e) => {

        e.target.innerText = 'Toegevoegd'

        db.collection("Admins")
        .doc()
        .set({
            CompagnyID: client,
            UserName: adminName,
            Photo: adminPhoto,
            UserID: adminID,
            Email: adminEmail
        })
        .then(() => {
            db.collection("Email").doc().set({
                to: [adminEmail],
                cc: "info@Deccos.nl",
                message: {
                subject: `Je bent als beheerder toegevoegd op ${communityName}`,
                html: `Hallo ${adminName}, </br></br>
                    Je bent door een beheerder van de ${host.Name} ${host.Text} van ${communityName} toegevoegd als beheerder.<br><br>
    
                    Dat betekent dat je vanaf nu:<br><br>
    
                    <ul>
                        <li>Algemene instellingen kunt aanpassen.</li>
                        <li>Impact visualisaties kunt delen.</li>
                        <li>Gebruikersrollen kan wijzigen.</li>
                        <li>Nieuwe teamleden kunt uitnodigen.</li>
                    </ul><br><br>
                    
                    Vriendelijke groet, </br></br>
                    Team ${host.Name} </br></br>
                    `,
                Gebruikersnaam: `${adminName}`,
                Emailadres: adminEmail,
                Type: "Verification mail"
                  }     
              });
        })
    }

    return (
        <div className="main">
            <LeftSideBarAuthProfile />
            <LeftSideBarAuthProfileFullScreen/>
            <div className="main-container" style={{display: menuState}}>
                <div className="profile-inner-container">
                    <div className=" divider card-header">
                        <h1>Gebruikersrollen</h1>
                        <p>Pas de gebruikersrollen aan</p>
                    </div>
                    <div className="divider">
                        <h2>Admin</h2>
                        <p>De admin rol geeft toegang tot de volgende beheersopties:</p>
                        <ul>
                            <li>Algemene instellingen aanpassen</li>
                            <li>Leden uitnodigen en verwijderen</li>
                            <li>Gebruikersrollen wijzigen</li>
                            <li>Nieuwe aanmeldingen voor de online omgeving goedkeuren</li>
                        </ul>
                        <h4>Leden met rol admin</h4>
                        {admins && admins.map(admin => (
                            <div className="userrole-users-container" key={admin.ID}>
                                <img src={admin.Photo} alt="" />
                                <p>{admin.UserName}</p>
                                <img src={deleteIcon} alt="" className="userrole-users-delete-button" data-id={admin.docid} onClick={deleteAdmin}/>
                            </div>
                        ))}
                        <h4>Admin toevoegen</h4>
                        <select className="userrole-select" name="" id="" onChange={adminHandler}>
                            <option value="">--- Selecteer ---</option>
                            {users && users.map(user => (
                                <option data-id={user.ID} data-name={user.UserName} data-photo={user.Photo} data-email={user.Email} key={user.ID}>{user.UserName}</option>
                            ))}
                        </select>
                        <div className="button-userrole-container">
                            <button className="button-simple" onClick={addAdmin}>Toevoegen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRoles
