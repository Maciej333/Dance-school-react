import React, { Fragment, MouseEvent, useState } from 'react';
import './MultiLink.style.scss';

export default function MultiLink(props: { name: string, links: JSX.Element[] }) {

    const { name, links } = props;
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(prev => !prev);
    }

    const closeLinks = (e: MouseEvent<HTMLDivElement>) => {
        const element = e.target;
        if ((element as HTMLElement).tagName === 'A')
            setShow(false);
    }

    return (
        <div className='multi-link' onClick={closeLinks}>
            <div className='multi-btn link' onClick={handleClick}>{name}</div>
            {
                show ?
                    <div className='multi-links'>
                        {
                            links.map((el, id) => {
                                return <Fragment key={`[multi link] = ${id}`}>{el}</Fragment>
                            })
                        }
                    </div>
                    :
                    null
            }
        </div>

    )
}
