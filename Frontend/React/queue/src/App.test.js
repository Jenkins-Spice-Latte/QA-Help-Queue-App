import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import Sort from './Components/Sort';
import Filter from './Components/Filter';
import Create from './Components/Create';
import Queue from './Components/Queue';
import Toggle from './Components/Toggle';
import App from './App';

test('tests to see if Create renders properly', () => {
  const createComp = renderer.create(<Create mode="Trainee mode" switchLoaded= {false}/>).toJSON();
  expect(createComp).toMatchSnapshot();
});

test('tests to see if Sort renders properly', () => {
  const SortComp = renderer.create(<Sort setTitleFilter={App.setTitleFilter}/>).toJSON();
  expect(SortComp).toMatchSnapshot();
});

test('tests to see if Filter renders properly', () => {
  const filterComp = renderer.create(<Filter urgencyCheck={App.onFilterUrgentCheckboxClick} setAuthorFilter={App.setAuthorFilter} urgent={[1,2,3,4,5]} 
  topicCheck={App.onFilterTopicCheckboxClick} topic={["Topic1", "Topic2", "Topic3", "Topic4", "Topic5"]}/>).toJSON();
  expect(filterComp).toMatchSnapshot();
});

test('tests to see if Toggle renders properly', () => {
  const toggleComp = renderer.create(<Toggle onCheckboxBtnClick={App.onCheckboxBtnClick} mode={App.modeSelect}/>).toJSON();
  expect(toggleComp).toMatchSnapshot();
});

test('tests to see if Queue renders properly', () => {
  const QueueComp = renderer.create(<Queue mode={(App.modeSelect)} urgentfilter={[1, 2, 3, 4, 5]} 
  topicfilter={["Topic1", "Topic2", "Topic3", "Topic4", "Topic5"]} authorfilter={""} switchLoaded={false} isLoaded={false}/>).toJSON();
  expect(QueueComp).toMatchSnapshot();
});
