import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Button } from './components/Button';
import { useEffect, useState } from 'react';
import { Channel } from './components/Channel';


if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: process.env.REACT_APP_API_KEY,
		authDomain: process.env.REACT_APP_AUTH_DOMAIN,
		projectId: process.env.REACT_APP_PROJECT_ID,
		storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_APP_ID,
	});
} else {
	firebase.app(); // Si esta inicializado, usa la app
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
        
        <Button onclick={signInWithGoogle}>Iniciar sesión con Google</Button>}
    </div>
	);
}

export default App;
