import React, { useEffect, useState } from 'react';
import './CardCarousel.style.scss';

export default function CardCarousel(props: { cards: any[], cardComponent: React.ComponentType<{ element: any }> }) {

    const [cards, setCards] = useState<any[]>([]);
    const [max, setMax] = useState(0);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        setCards(props.cards);
        setMax(props.cards.length - 1);
        if (props.cards.length % 2 === 1) {
            setPosition(Math.floor(props.cards.length / 2));
        } else {
            setPosition(props.cards.length / 2);
        }
    }, [props])

    const handleLeft = () => {
        setPosition(prev => {
            if (prev === 0)
                return max;
            else
                return prev - 1;
        })
    }
    const handleRight = () => {
        setPosition(prev => {
            if (prev === max)
                return 0;
            else
                return prev + 1;
        })
    }

    return (
        <div>
            <div className='card-carousel'>
                {
                    cards.map((element, id) => {

                        const half = Math.floor((max + 1) / 2);
                        let poz = (id - position);
                        const pozSide = poz / half;
                        const isRight = ((pozSide <= 1 && pozSide > 0) || pozSide < -1) ? true : false;

                        let move = 200;
                        poz = Math.abs(poz);
                        if (isRight && id < position) {
                            poz = (max + 1) - poz;
                        }
                        if (!isRight && id > position) {
                            poz = (max + 1) - poz;
                        }
                        move = move * poz;

                        let card = '';
                        if (id !== position) {
                            if (isRight) {
                                card = `translateX(${move}px) translateZ(-${100 + move}px)`;
                            } else {
                                card = `translateX(-${move}px) translateZ(-${100 + move}px)`;
                            }
                        }

                        return <div
                            key={`[card]=${id}`}
                            style={{ transform: card, zIndex: id === position ? "11" : "" }}
                            className="card-div"
                        >
                            <props.cardComponent element={element} />
                        </div>;
                    })
                }
            </div>
            <div className='buttons'>
                <svg viewBox="0 0 80 60" onClick={handleLeft} className="triangle">
                    <polygon points="0,30 80,0 80,60" />
                </svg>
                <div className='dots'>
                    {
                        (Array(max + 1).fill(1)).map((el, id) => {
                            return <div key={`[dot] = ${id}`} className={`dot ${id === position ? 'active' : ''}`}>{""}</div>
                        })
                    }
                </div>
                <svg viewBox="0 0 80 60" onClick={handleRight} className="triangle">
                    <polygon points="80,30 0,0 0,60" />
                </svg>
            </div>
        </div>

    )
}
