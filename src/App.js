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
	const signOut = async () => {
		try {
			await firebase.auth().signOut();
		} catch (e) {
			console.log(e.message);
		}
	};

	if (initializing) return 'Cargando...';

	return (
		<div>
			{user ? (
				<>
					<div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
						<header
							className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md"
							style={{ height: 'var(--topbar-height)' }}
						>
							<a href="https://alterclass.io/courses/react"></a>
							<div className="flex items-center">
								{user ? (
									<button
										onClick={signOut}
										className="uppercase text-sm font-medium text-primary-500 hover:text-white tracking-wide hover:bg-primary-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 transition-all"
									>
										Cerrar sesión
									</button>
								) : null}
							</div>
						</header>
						<main className="flex-1" style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}>
							<Channel user={user} db={db}></Channel>
						</main>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center shadow-md h-full">
					<div className="flex flex-col items-center justify-center max-w-xl w-full mx-4 p-8 rounded-md shadow-card bg-white dark:bg-coolDark-600 transition-all">
						<h2 className="mb-2 text-3xl flex items-center">
							<svg className="flex-shrink-0 w-10 h-10 mr-1 text-primary-500" viewBox="0 0 20 20">
								<path
									fillRule="none"
									d="M17.125,1.375H2.875c-0.828,0-1.5,0.672-1.5,1.5v11.25c0,0.828,0.672,1.5,1.5,1.5H7.75v2.25H6.625c-0.207,0-0.375,0.168-0.375,0.375s0.168,0.375,0.375,0.375h6.75c0.207,0,0.375-0.168,0.375-0.375s-0.168-0.375-0.375-0.375H12.25v-2.25h4.875c0.828,0,1.5-0.672,1.5-1.5V2.875C18.625,2.047,17.953,1.375,17.125,1.375z M11.5,17.875h-3v-2.25h3V17.875zM17.875,14.125c0,0.414-0.336,0.75-0.75,0.75H2.875c-0.414,0-0.75-0.336-0.75-0.75v-1.5h15.75V14.125z M17.875,11.875H2.125v-9c0-0.414,0.336-0.75,0.75-0.75h14.25c0.414,0,0.75,0.336,0.75,0.75V11.875z M10,14.125c0.207,0,0.375-0.168,0.375-0.375S10.207,13.375,10,13.375s-0.375,0.168-0.375,0.375S9.793,14.125,10,14.125z"
								></path>
							</svg>
							React - Firebase Chat
						</h2>
						<p className="mb-8 text-lg text-center">Una forma sencilla de comunicarse!</p>
						<button
							onClick={signInWithGoogle}
							className="rounded shadow-button pl-6 pr-8 py-3 bg-white hover:bg-gray-100 text-gray-600 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75"
						>
							<svg
								viewBox="5 -5 30 30"
								enableBackground="new 5 -5 30 30"
								className="w-6 h-6 mr-4 flex-shrink-0"
							>
								<path
									fill="#fff"
									d="M15.3-4.2C11.6-3 8.4-.2 6.6 3.2 6 4.5 5.6 5.7 5.3 7c-.7 3.3-.2 6.7 1.3 9.7 1 1.9 2.4 3.7 4.2 5 1.6 1.3 3.5 2.2 5.6 2.7 2.6.7 5.3.7 7.8.1 2.3-.5 4.5-1.6 6.3-3.2 1.9-1.7 3.2-3.9 3.9-6.2.8-2.6.9-5.3.4-8-4.8 0-9.6 0-14.4 0 0 2 0 3.9 0 5.9 2.8 0 5.6 0 8.3 0-.3 1.9-1.5 3.6-3.1 4.6-1 .7-2.2 1.1-3.4 1.3-1.2.2-2.5.2-3.7 0-1.2-.2-2.4-.7-3.4-1.4-1.6-1.1-2.9-2.8-3.5-4.6-.7-1.9-.7-4 0-5.8.5-1.3 1.2-2.5 2.2-3.5 1.2-1.2 2.8-2.1 4.6-2.5 1.5-.3 3-.2 4.5.2 1.2.4 2.4 1 3.3 1.9.9-.9 1.9-1.8 2.8-2.8.5-.5 1-1 1.5-1.5-1.4-1.3-3.1-2.3-4.9-3-3.3-1.2-7-1.2-10.3-.1z"
								></path>
								<path
									fill="#EA4335"
									d="M15.3-4.2c3.3-1.1 7-1.1 10.3.1 1.8.7 3.5 1.7 4.9 3-.5.5-1 1-1.5 1.5-.9.9-1.9 1.8-2.8 2.8-.9-.9-2.1-1.5-3.3-1.9-1.4-.4-3-.5-4.5-.2-1.7.4-3.3 1.2-4.6 2.5-1 1-1.8 2.2-2.2 3.5-1.7-1.3-3.3-2.5-5-3.8 1.8-3.5 5-6.2 8.7-7.5z"
								></path>
								<path
									fill="#FBBC05"
									d="M5.3 7c.3-1.3.7-2.6 1.3-3.7 1.7 1.3 3.3 2.5 5 3.8-.7 1.9-.7 4 0 5.8-1.7 1.3-3.3 2.5-5 3.8-1.5-2.9-2-6.4-1.3-9.7z"
								></path>
								<path
									fill="#4285F4"
									d="M20.3 7.2c4.8 0 9.6 0 14.4 0 .5 2.6.4 5.4-.4 8-.7 2.4-2 4.6-3.9 6.2-1.6-1.2-3.2-2.5-4.9-3.7 1.6-1.1 2.7-2.8 3.1-4.6-2.8 0-5.6 0-8.3 0 0-2 0-4 0-5.9z"
								></path>
								<path
									fill="#34A853"
									d="M6.6 16.7c1.7-1.3 3.3-2.5 5-3.8.6 1.8 1.9 3.5 3.5 4.6 1 .7 2.2 1.2 3.4 1.4 1.2.2 2.4.2 3.7 0 1.2-.2 2.4-.6 3.4-1.3 1.6 1.2 3.2 2.5 4.9 3.7-1.8 1.6-3.9 2.7-6.3 3.2-2.6.6-5.3.6-7.8-.1-2-.5-3.9-1.5-5.6-2.7-1.7-1.3-3.2-3-4.2-5z"
								></path>
							</svg>
							Iniciar sesión con Google
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
