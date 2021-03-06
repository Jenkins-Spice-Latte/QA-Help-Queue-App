import './App.css';
import React, { useState } from 'react';
import Sort from './Components/Sort';
import Filter from './Components/Filter';
import Create from './Components/Create';
import Queue from './Components/Queue';
import Toggle from './Components/Toggle';
import logo from './qahq-title.png';


function App() {
  const [modeSelect, setmodeSelect] = useState("Trainee mode");
  const [sortChange, setsortChange] = useState("Oldest");
  const [urgentFilterChange, setUrgentFilter] = useState([1,2,3,4,5]);
  const [topicFilterChange, setTopicFilter] = useState(["Dev Ops", "General", "Back-end", "Front-end", "Software"]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);


  const onCheckboxBtnClick = (selected) => {
    setmodeSelect(selected);
  }

  const onFilterUrgentCheckboxClick = (selected) => {
    const index = urgentFilterChange.indexOf(selected);
    if (index < 0) {
      urgentFilterChange.push(selected);
    } else {
      urgentFilterChange.splice(index, 1);
    }
    setUrgentFilter([...urgentFilterChange]);
  }

  const onFilterTopicCheckboxClick = (selected) => {
    const index = topicFilterChange.indexOf(selected);
    if (index < 0) {
      topicFilterChange.push(selected);
    } else {
      topicFilterChange.splice(index, 1);
    }
    setTopicFilter([...topicFilterChange]);
  }

  const switchLoaded = () => {
    setIsLoaded(!isLoaded);
  }

  return (
    <div className="App">
      <header className="App-header">
      <img className="img" src={logo} alt="cannot display"/>
      </header>
     
      <div className="all_columns">
        <div className="column_one">
          <div className= "create_ticket_div">  
            <Create mode={(modeSelect)} switchLoaded={switchLoaded}/>
          </div>
          <div  className= "sort_div">
            <Sort setTitleFilter={setTitleFilter}/>
          </div>
          <div  className= "filter_div">  
            <Filter urgencyCheck={onFilterUrgentCheckboxClick} setAuthorFilter={setAuthorFilter} urgent={(urgentFilterChange)} 
                    topicCheck={onFilterTopicCheckboxClick} topic={(topicFilterChange)}/>
          </div>
        </div>
        <div className="column_two">
          <div className= "toggle_div">
            <Toggle onCheckboxBtnClick={onCheckboxBtnClick} mode={modeSelect}/>
          </div>
          
            <Queue mode={(modeSelect)} sort={(sortChange)} urgentfilter={(urgentFilterChange)} titleFilter = {titleFilter}
                    topicfilter={(topicFilterChange)} authorfilter={(authorFilter)} switchLoaded={switchLoaded} isLoaded={(isLoaded)}/>

          
        </div>
      </div>
    </div>
  );
}

export default App;
