import { useState, useEffect } from 'react';
import { auth, db, timestamp } from "../../firebase/config";
import { client } from "../../hooks/Client";
import uuid from 'react-uuid';
import firebase from 'firebase'
import { useFirestore } from '../../firebase/useFirestore.js';
import { bucket } from '../../firebase/config';
import spinnerRipple from '../../images/spinner-ripple.svg'
import dummyPhoto from '../../images/Design/dummy-photo.jpeg'
import ScrollToTop from "../../hooks/ScrollToTop";
import Modal from 'react-modal';
import Hostname from '../../hooks/Hostname'

const RegisterUser = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [forname, setForname] = useState("")
    const [surname, setSurname] = useState("")
    const [photo, setPhoto] = useState(dummyPhoto)
    const [loader, setLoader] = useState("")
    const [communityNameDB, setCommunityNameDB] = useState("")
    const [modalOpen, setModalOpen] = useState(false);

    const id = uuid()
    ScrollToTop()
    Modal.setAppElement('#root');
    const host = Hostname()

    const modalStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
    const compagny = useFirestore("CompagnyMeta")

    useEffect(() => {
        compagny && compagny.forEach(comp => {
            setCommunityNameDB(comp.CommunityName)
        })
    }, [compagny])


    const closeModal = () => {
        setModalOpen(false);
      }
    

    const fornameHandler = (e) => {
        const forname = e.target.value

        setForname(forname)
    }

    const surnameHandler = (e) => {
        const surname = e.target.value

        setSurname(surname)
    }

    const emailHandler = (e) => {
        const email = e.target.value

        setEmail(email)
    }

    const passwordHandler = (e) => {
        const password = e.target.value

        setPassword(password)
    }

    const passwordRepeatHandler = (e) => {
        const passwordRepeat = e.target.value

        setPasswordRepeat(passwordRepeat)
    }

    const photoHandler = (e) => {
        setLoader(spinnerRipple)

        const photo = e.target.files[0]

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

            setPhoto(downloadURL)
            setLoader(downloadURL)

                })
            })
        })
    }

    const checkHandler = (e) => {
        e.preventDefault()
        e.target.innerText = "Aangemeld"

        if(password === passwordRepeat){
            registerHandler()
        } else {
            alert('De paswoorden zijn niet gelijk')
        }
    }

    const registerHandler = () => {
    
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            db.collection("Users")
            .doc(cred.user.uid)
            .set({
                UserName: `${forname} ${surname}`,
                ForName: forname,
                SurName: surname,
                Compagny: firebase.firestore.FieldValue.arrayUnion(client),
                Timestamp: timestamp,
                Email: email.toLocaleLowerCase(),
                Photo: photo,
                ID: id,
                Approved: false,
                Deleted: false,
                Docid: cred.user.uid,
            })
            .then(() => {
                verificationEmailEmail(email, forname, surname, communityNameDB)
            })
            .then(() => {
                setModalOpen(true)
            })
            .catch(err => { 
                alert(err)
            })
        })
    }


    const verificationEmailEmail = (email, forname, surname, communityName ) => {
        db.collection("Email").doc().set({
            to: email,
            from: 'info@deccos.nl',
            replyTo: `${host.Name}`,
            cc: "info@Deccos.nl",
            message: {
            subject: `Verificeer je account `,
            html: `Hallo ${forname} ${surname}, </br></br>
                Je hebt je aangemeld voor de ${host.Name} omgeving van ${communityName}. <br><br>

                Klik <a href="https://${host.Hostname}/${client}/NotApproved/${id}">hier</a> om je account te verifiëren.<br><br>
                
                Vriendelijke groet, </br></br>
                Team ${host.Name} </br></br>
                `,
            Gebruikersnaam: `${forname} ${surname}`,
            Emailadres: email,
            Type: "Verification mail"
              }     
          });
    }

    return (
        <div>
            <div className="login-container">
                <h1>Account maken</h1>
                <form>
                    <p>Voornaam*</p>
                    <input onChange={fornameHandler} type="text" placeholder="Schrijf hier je voornaam" />
                    <p>Achternaam</p>
                    <input onChange={surnameHandler} type="text" placeholder="Schrijf hier je achternaam" />
                    <p>E-mailadres*</p>
                    <input onChange={emailHandler} type="email" placeholder="Schrijf hier je e-mailadres" />
                    <p>Wachtwoord*</p>
                    <input onChange={passwordHandler} type="password" placeholder="Schrijf hier je wachtwoord" />
                    <p>Herhaal je wachtwoord*</p>
                    <input onChange={passwordRepeatHandler} type="password" placeholder="Herhaal hier je wachtwoord" />
                    <p>Profielfoto</p>
                    <input onChange={photoHandler} type="file" />
                    <div className="spinner-container">
                        <img src={loader} alt="" />
                    </div>
                </form>
                <div className="button-container-register">
                    <button onClick={checkHandler}>Aanmelden</button>
                </div>
                <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Verify account"
                >
                <div className='add-image-container'>
                    <h1>Welkom {forname} {surname}!</h1>
                    <h2>Je account is aangemaakt</h2>
                    <p>Je hoeft je account alleen nog te verifiëren. Er is een email gestuurd naar {email} waarmee je je account kunt verifiëren.</p>
                    <a href="https://deccos.nl/">Oké</a>
                </div>
                </Modal>
            </div>
        </div>
    )
}

export default RegisterUser
