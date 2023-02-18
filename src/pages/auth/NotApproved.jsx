import { useFirestoreUserNotApproved } from "../../firebase/useFirestore"
import { useState, useEffect } from "react"
import { db } from "../../firebase/config"
import Location from "../../hooks/Location"
import { useHistory } from "react-router-dom"
import Hostname from '../../hooks/Hostname'

const NotApproved = () => {
    const [user, setUser] = useState(null)

    const history = useHistory()
    const route = Location()[3]
    const host = Hostname()

    const users = useFirestoreUserNotApproved(route && route)

    useEffect(() => {
        users && users.forEach(user => {
            setUser(user)
        })
    }, [users])

    const verificationNotice = () => {

        if(user === null){
            return  <div>
                        <h2>Je account is niet bekend bij ${host.Name}</h2>
                        <p>Er is een probleem ontstaan waardoor je aacount niet kan worden gevonden bij ${host.Name}. 
                            Neem <a href="https://deccos.nl/Contact"></a> met ons op om het probleem op te lossen.</p>
                    </div>
        } else if(user != null){
            return  <div>
                        <button onClick={verifiyAccount}>Verifieer je account</button>
                    </div>
        }
    }

    const verifiyAccount = () => {

        if(user != null){
            db.collection("Users")
            .where("ID", "==", route)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    db.collection("Users")
                    .doc(doc.id)
                    .update({
                        Approved: true
                    })
                    .then(() => {
                        history.push(`/`)
                        window.location.reload()
                    })
                })
            })
        }
    }

    return (
        <div id='not-approved-container'>
            <div className="approval-message-container">
                <img src={user && user.Photo} alt=""/>
                <h2>Hoi {user && user.UserName},</h2>
                <h1>Welkom bij {host.Name} {host.Text}</h1>
                {verificationNotice()}
            </div>
        </div>
    )
}

export default NotApproved
