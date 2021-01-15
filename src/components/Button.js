import React from 'react'

export const Button = ({onclick=null, children=null}) => {
    return (
        <button onClick={onclick}>{children}</button>
    )
}
