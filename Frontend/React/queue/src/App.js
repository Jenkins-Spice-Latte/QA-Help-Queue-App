import './App.css';
import { Button } from 'reactstrap';
import React, { useState } from 'react';
import Sort from './Components/Sort';
import Filter from './Components/Filter';
import Create from './Components/Create';
import Queue from './Components/Queue';
import Toggle from './Components/Toggle';


function App() {
  const [modeSelect, setmodeSelect] = useState("Trainee mode");
  const [sortChange, setsortChange] = useState("Oldest");
  const [urgentFilterChange, setUrgentFilter] = useState([1,2,3,4,5]);
  const [topicFilterChange, setTopicFilter] = useState(["Topic1", "Topic2", "Topic3", "Topic4", "Topic5"]);
  const [authorFilter, setAuthorFilter] = useState("");

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

  const onSortBtnClick = (selected) => {
    setsortChange(selected);
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="all_columns">
        <div className="column_one">
          <div className= "create_ticket_div">  
            <Create mode={(modeSelect)}/>
          </div>
          <div  className= "sort_div">
            <Sort onSortBtnClick={onSortBtnClick}/>
          </div>
          <div  className= "filter_div">  
            <Filter urgencyCheck={onFilterUrgentCheckboxClick} setAuthorFilter={setAuthorFilter} urgent={(urgentFilterChange)} topicCheck={onFilterTopicCheckboxClick} topic={(topicFilterChange)}/>
          </div>
        </div>
        <div className="column_two">
          <div className= "toggle_div">
            <Toggle onCheckboxBtnClick={onCheckboxBtnClick} mode={modeSelect}/>
          </div>
          
            <Queue mode={(modeSelect)} sort={sortChange} urgentfilter={(urgentFilterChange)} topicfilter={(topicFilterChange)} authorfilter={(authorFilter)}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
