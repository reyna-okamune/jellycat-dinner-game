// Main React component (equivalent to HTML body)

import './App.css'
import JellycatCard from './JellycatCard';
import DinnerTable from './DinnerTable';
import { useState, useEffect } from 'react';


const jellycatCollection = [
  { name: "cinnamon bun", type: "pastry", img: "/jellycat-images/cinnamon_bun.png" },
  { name: "lemon", type: "fruit", img: "/jellycat-images/lemon.png" },
  { name: "ginger", type: "veggie", img: "/jellycat-images/ginger.png" },
  { name: "brie", type: "misc", img: "/jellycat-images/brie.png"},
  { name: "chili", type: "veggie", img: "/jellycat-images/chili.png"},
  { name: "clementine", type: "fruit", img: "/jellycat-images/clementine.png"},
  


];

const App = () => {

  const [jellycats, setJellycats] = useState([]); // `jellycats` is an empty array: [] `setJellycats()` is a function ready to update the state
  const [filter, setFilter] = useState("all"); // start with all collections
  const [selected, setSelected] = useState([]);


  // on mount (set values and render cards) on first render (useEffect [])
  useEffect(() => {
    // generate random int values 
    // Math.floor(Math.random() * max - min + 1) + min
    const generateValues = () => {
      const ranges = {
        fruit: [10, 18],
        veggie: [15, 25],
        pastry: [8, 12],
        misc: [12, 15]
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
        else if (jellycat.type === "misc") {
          jellycat.value = Math.floor(Math.random() * (ranges.misc[1] - ranges.misc[0] + 1)) + ranges.misc[0];
        }
        else {
          jellycat.value = 0;
        }

        // console.log(`${jellycat.type} : ${jellycat.value}`);
        return jellycat;
      });

      setJellycats(updatedJellycats); // React updates the jellycats state
    }

    // start all jellycats as unselected for dinner
    const generateSelect = () => {
      const updatedJellycats = jellycatCollection.map((jellycat) => {
        jellycat.selection = false;
        return jellycat;
      });
      setJellycats(updatedJellycats);
    }

    generateValues();
    generateSelect();

  }, []);

  // filtering based on type
  const filteredJellycats = filter === "all" ? jellycats : jellycats.filter((jellycat) => jellycat.type === filter);

  // keep track of selected card(s)
  const handleCardClick = (jellycat) => {
    // console.log(`${jellycat.name}: selected? ${jellycat.selection}`)
    
    // is it in selected list
    const isSelected = selected.find((item) => item.name === jellycat.name);

    if (isSelected) {
      // Deselect
      const updatedSelection = selected.filter((item) => item.name !== jellycat.name);
      setSelected(updatedSelection);
      // console.log(`${jellycat.name} deselected`);
    } else if (selected.length < 5) {
      // Select
      setSelected([...selected, { ...jellycat, selection: true }]);
      console.log(`${jellycat.name} selected`);
    }

  };

  useEffect(() => {
    console.log("Updated selected list (after render):", selected);
  }, [selected]);

  return (
    <div className="app">
      <header className="main-header">
        <h1>jellycat collection</h1>
        <h2>who's invited to dinner?</h2>
      </header>

      <DinnerTable selected={selected} />


      <div className="select-divider">
            <label className="options-label" htmlFor="jellycats-options">collection type: </label>
            <select className="jellycats" id="jellycats-options" value={filter} onChange = {(e) => setFilter(e.target.value)}>
                <option value="all">all food types</option>
                <option value="fruit">fruits</option>
                <option value="veggie">veggies</option>
                <option value="pastry">pastries</option>
                <option value="misc">misc types</option>
            </select>
      </div>

      <div className="cards-collection" id="jellycat-cards">
        {filteredJellycats.length > 0 ? (
            filteredJellycats.map((jellycat, index) => (
              <div 
                key={index} 
                onClick={() => handleCardClick(jellycat)}
              >
                <JellycatCard
                  key={index} 
                  name={jellycat.name}
                  type={jellycat.type}
                  img={jellycat.img}
                  value={jellycat.value}
                />
              </div>
            ))
          ) : (
            <p>no jellycats in this collection.</p>
        )}
    </div>





        
    </div>
  );
};

export default App;
