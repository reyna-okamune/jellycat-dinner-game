// Main React component (equivalent to HTML body)

import './App.css'
import JellycatCard from './JellycatCard';
import DinnerTable from './DinnerTable';
import { useState, useEffect } from 'react';


const jellycatCollection = [
  { name: "cinnamon bun", type: "pastry", img: "/jellycat-images/cinnamon_bun.png" },
  { name: "lemon", type: "fruit", img: "/jellycat-images/lemon.png" },
  { name: "ginger", type: "veggie", img: "/jellycat-images/ginger.png" },
  { name: "brie", type: "starter", img: "/jellycat-images/brie.png"},
  { name: "chili", type: "veggie", img: "/jellycat-images/chili.png"},
  { name: "clementine", type: "fruit", img: "/jellycat-images/clementine.png"},
  { name: "birthday cake", type: "pastry", img: "/jellycat-images/birthday_cake.png"},
  { name: "cauliflower", type: "veggie", img: "/jellycat-images/cauliflower.png"},
  { name: "lemon tart", type: "pastry", img: "/jellycat-images/lemon_tart.png"},
  { name: "pickle", type: "veggie", img: "/jellycat-images/pickle.png"},
  { name: "macaroon", type: "pastry", img: "/jellycat-images/macaroon.png"},
  


];

const App = () => {

  const [jellycats, setJellycats] = useState([]); // `jellycats` is an empty array: [] `setJellycats()` is a function ready to update the state
  const [filter, setFilter] = useState("all"); // start with all collections
  const [selected, setSelected] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [finalResult, setFinalResult] = useState("");


  // on mount (set values and render cards) on first render (useEffect [])
  useEffect(() => {
    // generate random int values 
    // Math.floor(Math.random() * max - min + 1) + min
    const generateValues = () => {
      const ranges = {
        fruit: [10, 18],
        veggie: [15, 25],
        pastry: [8, 12],
        starter: [5, 15]
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
        else if (jellycat.type === "starter") {
          jellycat.value = Math.floor(Math.random() * (ranges.starter[1] - ranges.starter[0] + 1)) + ranges.starter[0];
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


// debugging handling 
  useEffect(() => {
    console.log("Updated selected list (after render):", selected);
  }, [selected]);

  // submit dinner score
  const handleButtonClick = () => {
    let score = 0;
    selected.map((jellycat) => {
      score += jellycat.value;
    })
    console.log(score);

    setTotalScore(score);
    handleResultString();
  };

  // debugging handling 
  useEffect(() => {
    console.log("Updated total score (after render):", totalScore);
  }, []);

  // scoring criteria handling
  const handleResultString = () => {

    // lowest score : 5*5 = 25
    // highest score : 25*5 = 125

    // FIXME: saver for later
    // if has starter = +5pts
    // if more than 2 pastries = -20 points
    // if more than 2 veggie = -5 points

    let result_str = "";

    if (115 <= totalScore) {
      result_str = "legendary dinner party! great job!"
    } 
    else if (80 <= totalScore) {
      result_str = "nice dinner party! almost legendary!"
    }
    else if (60 <= totalScore) {
      result_str = "okay dinner party! could be better ..."
    }
    else {
      result_str = "bad dinner party! hopefully they come back ..."
    }

    setFinalResult(result_str);
  }

  return (
    <div className="app">
      <header className="main-header">
        <h1>jellycat dinner collection</h1>
        <h2>let's throw a spectacular dinner party !</h2>
      </header>

      <div className="main-container">

        <div className="left-container">
          <div className="select-divider">
                <label className="options-label" htmlFor="jellycats-options">collection type: </label>
                <select className="jellycats" id="jellycats-options" value={filter} onChange = {(e) => setFilter(e.target.value)}>
                    <option value="all">all food types</option>
                    <option value="fruit">fruits</option>
                    <option value="veggie">veggies</option>
                    <option value="pastry">pastries</option>
                    <option value="starter">starters</option>
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

        <div className="right-container">
          
          <DinnerTable selected={selected} />

          <div className="total-score">
            {selected.length === 5 ? (
              <h2 className="on">{finalResult}</h2>

            ) : (<h2 className="false">{finalResult}</h2>

            )}
          </div>

          {/* button always visible but pale when not 5 items selected */}
          <button
            className={`submit-btn ${selected.length === 5 ? 'active' : 'disabled'}`}
            onClick={handleButtonClick}
            disabled={selected.length !== 5}
          >
            submit your dinner selection
          </button>
        </div>

      </div>

    </div>
  );
};

export default App;
