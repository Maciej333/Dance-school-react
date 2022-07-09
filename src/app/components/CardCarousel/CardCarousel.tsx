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
                            style={{ transform: card }}
                            className="card-div"
                        >
                            <props.cardComponent element={element} />
                        </div>;
                    })
                }
            </div>
            <button onClick={handleLeft}>LEFT</button>
            <button onClick={handleRight}>RIGHT</button>
        </div>

    )
}
