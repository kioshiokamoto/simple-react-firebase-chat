import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({ creado = null, texto = '', displayName = '', photoURL = '' }) => {
	return (
		<div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
			{photoURL ? <img src={photoURL} alt="avatar" width={45} height={45} className="rounded-full mr-4" /> : null}
			<div>
				<div className="flex items-center mb-1">
					{displayName ? <p className="mr-2 text-primary-500">{displayName}</p> : null}
					{creado?.seconds ? (
						<span className="text-gray-500 text-xs">{formatRelative(new Date(creado.seconds * 1000), new Date())}</span>
					) : null}
				</div>

				<p>{texto}</p>
			</div>
		</div>
	);
};
export default Message;
