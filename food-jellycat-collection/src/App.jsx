// Main React component (equivalent to HTML body)

import './App.css'
import JellycatCard from './JellycatCard';
import { useState, useEffect } from 'react';


const jellycatCollection = [
  { name: "Cinnamon Bun", type: "pastry", img: "/jellycat-images/cinnamon_bun.png" },
  { name: "Lemon", type: "fruit", img: "/jellycat-images/lemon.png" },
  { name: "Ginger", type: "veggie", img: "/jellycat-images/ginger.png" }
];

const App = () => {

  const [jellycats, setJellycats] = useState([]); // `jellycats` is an empty array: [] `setJellycats()` is a function ready to update the state

  // on mount (set values and render cards) on first render (useEffect [])
  useEffect(() => {

    // generate random int values
    // Math.floor(Math.random() * max - min + 1) + min
    const generateValues = () => {
      const ranges = {
        fruit: [10, 18],
        veggie: [15, 25],
        pastry: [8, 12],
      }

      const updatedJellycats = jellycatCollection.map((jellycat) => {
        // console.log(jellycat.type);

        if (jellycat.type === "fruit") {
          jellycat.value = Math.floor(Math.random() * (ranges.fruit[1] - ranges.fruit[0] + 1)) + ranges.fruit[0];
        }
        else if (jellycat.type === "veggie") {
          jellycat.value = Math.floor(Math.random() * (ranges.veggie[1] - ranges.veggie[0] + 1)) + ranges.veggie[0];
        }
        else if (jellycat.type === "pastry") {
          jellycat.value = Math.floor(Math.random() * (ranges.pastry[1] - ranges.pastry[0] + 1)) + ranges.pastry[0];
        }
        else {
          jellycat.value = 0;
        }

        console.log(`${jellycat.type} : ${jellycat.value}`);
        return jellycat;
      });

      setJellycats(updatedJellycats); // React updates the jellycats state
    }

    generateValues();

  }, []);


  return (
    <div className="app">
      <header className="main-header">
        <h1>jellycat collection</h1>
        <h2>who's invited to dinner?</h2>
      </header>

      <div className="select-divider">
            <label className="options-label" htmlFor="jellycats-options">collection type: </label>
            <select className="jellycats" id="jellycats-options">
                <option value="all">all food types</option>
                <option value="fruits">fruits</option>
                <option value="veggies">veggies</option>
                <option value="pastries">pastries</option>
            </select>
      </div>

      <div className="cards-collection" id="jellycat-cards">
        {jellycats.map((jellycat, index) => (
          <JellycatCard 
            key={index}  
            name={jellycat.name}
            type={jellycat.type}
            img={jellycat.img}
            value={jellycat.value}
          />
        ))}
    </div>


        
    </div>
  );
};

export default App;
