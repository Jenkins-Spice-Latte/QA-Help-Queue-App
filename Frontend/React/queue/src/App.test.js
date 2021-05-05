import renderer from 'react-test-renderer';
import Sort from './Components/Sort';
import Filter from './Components/Filter';
import Create from './Components/Create';
import Queue from './Components/Queue';
import Toggle from './Components/Toggle';

test('Check if modeSelect, sortChange and authorFilter are valid', () => {
  expect(modeSelect).toBeDefined();
  expect(modeSelect).toBeNaN();
  expect(modeSelect).toContain("mode");

  expect(sortChange).toBeDefined();
  expect(sortChange).toBeNaN();

  expect(authorFilter).toBeNaN();
});

test('Check if setModeSelect, setsortChange, setAuthorFilter and setIsLoaded are working', () => {
  setmodeSelect("Trainer mode");
  expect(modeSelect).toEqual("Trainer mode");

  setsortChange("Newest");
  expect(sortChange).toEqual("Newest");
  
  setAuthorFilter("Newest");
  expect(authorFilter).toEqual("Newest");
  
  setIsLoaded(true);
  expect(isLoaded).toEqual(true);
});

test('Check if setUrgentFilter and setTopicFilter are working', () => {
  const urgentexpected = [6];
  const topicexpected = ["Topic7"];
  setUrgentFilter([...6]);
  setTopicFilter([..."Topic7"]);
  
  expect(urgentFilterChange).toEqual(
    expect.arrayContaining(urgentexpected),
  );
  expect(topicFilterChange).toEqual(
    expect.arrayContaining(topicexpected),
  );

});

test('Check if onCheckboxBtnClick, switchLoaded and onSortBtnClick are working', () => {
  setmodeSelect("Trainer mode");
  onCheckboxBtnClick("Trainee mode");
  expect(modeSelect).toEqual("Trainee mode");

  setIsLoaded(true);
  switchLoaded();
  expect(setIsLoaded).toEqual(false);

  setsortChange("Newest");
  onSortBtnClick("Oldest");
  expect(sortChange).toEqual("Oldest");

});


test('Check if onFilterUrgentCheckboxClick and onFilterTopicCheckboxClick are working', () => {
  setUrgentFilter([]);
  onFilterUrgentCheckboxClick([1]);
  expect(urgentFilterChange).toEqual([1]);

  setTopicFilter([]);
  onFilterTopicCheckboxClick(["Topic1"]);
  expect(topicFilterChange).toEqual(["Topic1"]);
});

test('tests to see if Create renders properly', () => {
  const createComp = renderer.create(<Create mode={(modeSelect)} switchLoaded={switchLoaded}/>).toJSON();
  expect(createComp).toMatchSnapshot();
});

test('tests to see if Sort renders properly', () => {
  const SortComp = renderer.create(<Sort onSortBtnClick={onSortBtnClick}/>).toJSON();
  expect(SortComp).toMatchSnapshot();
});

test('tests to see if Filter renders properly', () => {
  const filterComp = renderer.create(<Filter urgencyCheck={onFilterUrgentCheckboxClick} setAuthorFilter={setAuthorFilter} urgent={(urgentFilterChange)} 
  topicCheck={onFilterTopicCheckboxClick} topic={(topicFilterChange)}/>).toJSON();
  expect(filterComp).toMatchSnapshot();
});

test('tests to see if Toggle renders properly', () => {
  const toggleComp = renderer.create(<Toggle onCheckboxBtnClick={onCheckboxBtnClick} mode={modeSelect}/>).toJSON();
  expect(toggleComp).toMatchSnapshot();
});

test('tests to see if Queue renders properly', () => {
  const QueueComp = renderer.create(<Queue mode={(modeSelect)} sort={(sortChange)} urgentfilter={(urgentFilterChange)} 
  topicfilter={(topicFilterChange)} authorfilter={(authorFilter)} switchLoaded={switchLoaded} isLoaded={(isLoaded)}/>).toJSON();
  expect(QueueComp).toMatchSnapshot();
});
