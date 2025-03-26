import './MemoryGame.css';
import JellycatCard from './JellycatCard';
import { useState, useEffect } from 'react';

const jellycatCards = [
    { name: "cinnamon bun", type: "pastry", img: "/jellycat-images/cinnamon_bun.png" },
    { name: "lemon", type: "fruit", img: "/jellycat-images/lemon.png" },
    { name: "ginger", type: "veggie", img: "/jellycat-images/ginger.png" },
    { name: "brie", type: "other", img: "/jellycat-images/brie.png"},
    { name: "chili", type: "veggie", img: "/jellycat-images/chili.png"},
    { name: "macaroon", type: "pastry", img: "/jellycat-images/macaroon.png"},
    { name: "clementine", type: "fruit", img: "/jellycat-images/clementine.png"},
    { name: "birthday cake", type: "pastry", img: "/jellycat-images/birthday_cake.png"},
    { name: "cauliflower", type: "veggie", img: "/jellycat-images/cauliflower.png"},
    { name: "lemon tart", type: "pastry", img: "/jellycat-images/lemon_tart.png"},
    { name: "pickle", type: "veggie", img: "/jellycat-images/pickle.png"},
];

const MemoryGame = () => {

    const [jellycats, setJellycats] = useState([]);

    useEffect (() => {
        const duplicateCards = [...jellycatCards, ...jellycatCards];
        const shuffledCards = duplicateCards.sort(() => Math.random() - 0.5); 

        setJellycats(shuffledCards);


        // debugging
        console.log(`cards: ${shuffledCards.length > 0 ? duplicateCards.length : "none"}`)
    }, []);
    



    return (

        <div className="game-container animated-item">
            <div className="page-header">
                <h2>memory game</h2>
                <p>flip two cards that are matching pairs until all cards are gone !</p>
            </div>

            <div className="grid">
                { jellycats.length > 0 ? (
                    jellycats.map((jellycat, index) => {
                        <JellycatCard 
                            key={index}
                            name={jellycat.name}
                            type={jellycat.type}
                            img={jellycat.img}
                        />
                    })

                ) : (
                    <p>no jellycats yet!</p>  
                )
                }
            </div>
        </div>
    );
}

export default MemoryGame;