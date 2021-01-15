import React from 'react';
import {formatRelative} from 'date-fns'

const Message = ({
    creado = null,
    texto = '',
    displayName = '',
    photoURL = '',
}) =>{
    return (
        <div>
            {photoURL ? (
                <img src={photoURL} alt="avatar" width={45} height={45}/>
            ) : null}
            {displayName ? <p>{displayName}</p> : null}
            {creado?.seconds ? (
                <span>
                    {formatRelative(new Date(creado.seconds * 1000),new Date())}
                </span>
            ) : null}
            <p>{texto}</p>
        </div>
    );
}
export default Message;