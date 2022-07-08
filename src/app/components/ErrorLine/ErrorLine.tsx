import React from 'react';
import './ErrorLine.style.scss';

export default function ErrorLine(props: { msg: string }) {
    return (
        <div className='msg-error'>
            <p>{props.msg}</p>
        </div>
    )
}
