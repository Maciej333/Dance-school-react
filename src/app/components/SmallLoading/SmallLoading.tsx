import React from 'react'
import './SmallLoading.style.scss';

export default function SmallLoading(props: { color: string }) {
    return (
        <div className='small-loading'>
            <span className="dot" style={{ backgroundColor: props.color }}></span>
            <span className="dot" style={{ backgroundColor: props.color }}></span>
            <span className="dot" style={{ backgroundColor: props.color }}></span>
        </div>
    )
}
