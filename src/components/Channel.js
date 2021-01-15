import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Message from './Message';

export const Channel = ({ user = null, db = null }) => {
    const [mensajes, setMensajes] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { uid, displayName, photoURL } = user;
	useEffect(() => {
		if (db) {
			const unsubscribe = db
				.collection('mensajes')
				.orderBy('creado')
				.limit(100)
				.onSnapshot((querySnapshot) => {
					//Obtener todos los documentos de la coleccion con ID.
					const data = querySnapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}));
					setMensajes(data);
				});
			//Actualizar estado
			return unsubscribe;
		}
	}, [db]);

    const handleOnChange = (e)=>{
        setNewMessage(e.target.value);
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();

        if(db){
            db.collection('mensajes').add({
                texto: newMessage,
                creado: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
    }
	return (
		<>
			<ul>
				{mensajes.map((mensaje) => (
					<li key={mensaje.id}><Message {...mensaje} /></li>
				))}
			</ul>
            <form onSubmit={handleOnSubmit}>
                <input 
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder="Escribe tu mensaje aquí..."
                />
                <button type="submit" disabled={!newMessage}>Enviar</button>
            </form>
		</>
	);
};
