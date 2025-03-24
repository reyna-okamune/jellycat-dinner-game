import { useState, useEffect } from 'react';
import JellycatCard from './JellycatCard';
import './Dashboard.css';

const jellycatCollection = [
    { name: "cinnamon bun", type: "pastry", img: "/jellycat-images/cinnamon_bun.png" },
    { name: "lemon", type: "fruit", img: "/jellycat-images/lemon.png" },
    { name: "ginger", type: "veggie", img: "/jellycat-images/ginger.png" },
    { name: "brie", type: "other", img: "/jellycat-images/brie.png"},
    { name: "chili", type: "veggie", img: "/jellycat-images/chili.png"},
    { name: "clementine", type: "fruit", img: "/jellycat-images/clementine.png"},
    { name: "birthday cake", type: "pastry", img: "/jellycat-images/birthday_cake.png"},
    { name: "cauliflower", type: "veggie", img: "/jellycat-images/cauliflower.png"},
    { name: "lemon tart", type: "pastry", img: "/jellycat-images/lemon_tart.png"},
    { name: "pickle", type: "veggie", img: "/jellycat-images/pickle.png"},
    { name: "macaroon", type: "pastry", img: "/jellycat-images/macaroon.png"},
];

const Dashboard = () => {

    const [jellycats, setJellycats] = useState(jellycatCollection);
    const [filterCategory, setFilterCategory] = useState("");
    const [sort, setSort] = useState("");


    // filter jellycats function handling
    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    // filtered jellycat collection
    const filteredJellycats = jellycats.filter(jellycat => {
        if (filterCategory === "") {
            return true;
        }
        else {
            return jellycat.type === filterCategory;
        }
    })

    // sort jellycats function handling
    const handleSortChange = (e) => {
        const sortChoice = e.target.value;
        setSort(sortChoice);

        if (sortChoice === "shuffle") {
            handleShuffle();
        } else {
            handleAlphabeticalSort(sortChoice);  
        }
    }

    // shuffle jellycats function handling
    const handleShuffle = () => {
        // spread operator with sort and math random
        // Math.random() - 0.5 => (<0) move current element before next one
        const shuffled = [...jellycats].sort(() => Math.random() - 0.5);  
        setJellycats(shuffled);
    }

    // sort jellycats alphabetically handling
    const handleAlphabeticalSort = (order) => {
        const sortedJellycats = [...jellycats].sort((a,b) => {
            if (order === "asc") {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }

            else if (order === "desc") {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            }
        })

        setJellycats(sortedJellycats);
    }

    useEffect (() => {
        console.log(`testing`);
    }, []);

    return (
        <div className="dashboard">

            <div className="controls">
                <div className="select-control">
                    <label>collection:</label>
                    <select value={filterCategory} onChange={handleFilterChange}>
                            <option value="">all types</option>
                            <option value="fruit">fruits</option>
                            <option value="veggie">veggies</option>
                            <option value="pastry">pastries</option>
                            <option value="other">others</option>
                    </select>
               </div>

                <div className="button-control">
                <label>sort:</label>
                    <select value={sort} onChange={handleSortChange}>
                        <option value="">none</option>
                        <option value="asc">(a - z)</option>
                        <option value="desc">(z - a)</option>
                        <option value="shuffle">shuffle</option>
                    </select>
                </div>
            </div>

            <div className="grid">
                { filteredJellycats.length > 0 ? (
                    filteredJellycats.map((jellycat, index) => (
                        <JellycatCard 
                            key={index}
                            name={jellycat.name}
                            type={jellycat.type}
                            img={jellycat.img}
                        />
                    ))
                ) : (
                    <p>no jellycats yet!</p>
                )}
            </div>
        </div>
    );


};

export default Dashboard;