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
    const [flippedCards, setFlippedCards] = useState([]); // tracks the two selected cards
    const [matchedCards, setMatchedCards] = useState([]); // keeps a record of correctly matched pairs
    const [numberOfTurns, setNumberOfTurns] =useState(0); //  counts the number of turns


    // tasks on mount
    useEffect (() => {
        const duplicateCards = [...jellycatCards, ...jellycatCards].map((jellycat, index) => ({
            ...jellycat, 
            uniqueId: `${jellycat.name}-${index}`
        }));
        const shuffledCards = duplicateCards.sort(() => Math.random() - 0.5); 

        setJellycats(shuffledCards);
    }, []);

    const handleCardClick = (jellycat) => {

        console.log("called handleCardClick() function.");

        // check to see if call cards flipped
        if (matchedCards.length === jellycats.length) {
            console.log("you found all matching cards");
            return;
        }

        // base case: can not add same id as matching pair
        // check if flipped cards is populated and see if two cards are matching
        if (flippedCards.length > 0) {

            const sameID = flippedCards.some(item => item.uniqueId === jellycat.uniqueId);
            const foundPair = flippedCards.some(item => item.name === jellycat.name); // found pair

            if (foundPair && !sameID) {
                setMatchedCards((prev) => [...prev, ...flippedCards, jellycat]);
                setFlippedCards([]);
                console.log(`found pair thats not same id!`);
            } 
            else if (sameID) {
                console.log("you can't click the same card!")
            }

            else {
                console.log("not matching :(!")
                setFlippedCards([]);
            }

            setNumberOfTurns((prev) => prev + 1);
        }

        else {
            setFlippedCards((prev) => [...prev, jellycat]);
            console.log(`called handleCardClick() function. added ${jellycat.name} with id ${jellycat.uniqueId}. arr length: ${flippedCards.length + 1}`);
        }
            
    }

    return (
        <div className="game-container animated-item">
            <div className="page-header">
                <h2>memory game</h2>
                <p>flip two cards that are matching pairs until all cards are gone !</p>
                <p>turns: {numberOfTurns}</p>
            </div>

            <div className="grid">
                { jellycats.length > 0 ? (
                    jellycats.map((jellycat, index) => (
                        <div
                            key={index}
                            onClick={() => handleCardClick(jellycat)}
                            className={`card-container ${flippedCards.includes(jellycat) ? "flipped" : ""}`}
                        >
                            <div className="card-face back">
                                <JellycatCard 
                                    key={index}
                                    name={jellycat.name}
                                    type={jellycat.type}
                                    img={jellycat.img}
                                />
                            </div>
                            <div className="card-face front">
                            </div>
                        </div>
                    ))

                ) : (
                    <p>no jellycats yet!</p>  
                )
                }
            </div>
        </div>
    );
}

export default MemoryGame;