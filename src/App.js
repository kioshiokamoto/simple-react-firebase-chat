import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Button } from './components/Button';
import { useEffect, useState } from 'react';
import { Channel } from './components/Channel';


if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyAhFhO2Uc2n2Zji-cNvuHs27hTwMlTdi6Q',
		authDomain: 'react-firebase-chat-kjor.firebaseapp.com',
		projectId: 'react-firebase-chat-kjor',
		storageBucket: 'react-firebase-chat-kjor.appspot.com',
		messagingSenderId: '636119235121',
		appId: '1:636119235121:web:1b9fa0b11ad82a168e7310',
	});
} else {
	firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

function App() {
	const [user, setUser] = useState(() => firebase.auth().currentUser);
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		if (initializing) {
			setInitializing(false);
		}

		return unsubscribe;
	}, [initializing]);
	const signInWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().useDeviceLanguage();
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (e) {
			console.log(e.message);
		}
  };
  const signOut = async()=>{
    try{
      await firebase.auth().signOut();
    }catch(e){
      console.log(e.message)
    }
  }

  if (initializing) return 'Cargando...';
  
	return (
    <div>{user 
      ? 
        <>
          <Button onclick={signOut}>Cerrar sesión</Button>
          <Channel user={user} db={db}></Channel>
        </> 
      : 
        <Button onclick={signInWithGoogle}>Iniciar sesión con Google</Button>}</div>
	);
}

export default App;
