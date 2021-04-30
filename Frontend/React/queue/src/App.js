import './App.css';
import { Button } from 'reactstrap';
import Sort from './Components/Sort';
import Filter from './Components/Filter';
import Create from './Components/Create';
import Queue from './Components/Queue';
import Toggle from './Components/Toggle';
import { useState } from 'react';

function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  const switchLoaded = () => {
    setIsLoaded(!isLoaded);
  }

  console.log("app.js")
  console.log(isLoaded)

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="all_columns">
        <div className="column_one">
          <div className= "create_ticket_div">  
            <Create/>
          </div>
          <div  className= "sort_div">
            <Sort/>
          </div>
          <div  className= "filter_div">
            <Filter/>
          </div>
        </div>
        <div className="column_two">
          <div className= "toggle_div">
            <Toggle switchLoaded={switchLoaded} isLoaded={isLoaded}/>
          </div>
          
            {/* <Queue/> */}
          
        </div>
      </div>
    </div>
  );
}

export default App;
