/* eslint-disable import/no-cycle */
import React from 'react';
import ModeHeader from '../modeHeader';

const PropertiesJson = require('../json/properties.json');
const DictJson = require('../json/dict.json');

let localProp = JSON.parse(localStorage.getItem('hgp-properties'));
if (localProp) {
  PropertiesJson.language = localProp.language;
  PropertiesJson.theme = localProp.theme;
  PropertiesJson.mode = localProp.mode;
} else { localProp = PropertiesJson; }

// const clickEvent = () => {};

const Planner = () => {
  const { language } = PropertiesJson;

  // const localFamily = JSON.parse(localStorage.getItem('hgp-family'));

  // const familyData = localFamily || PropertiesJson.family;

  const modeBlock = () => (
    <div className="mode">
      <div className="planner-mode">{DictJson[language].plannerWeek}</div>
      <div className="planner-mode">{DictJson[language].plannerDay}</div>
      <div className="planner-icon" />
    </div>
  );

  // const plannerMode = () => {
  //   return (<>
  //       <div className="week-switcher">
  //       <div onClick={clickEvent} className="adults-minus material-icons">remove_circle</div>
  //          <div id="adults-value" className="adults-value">{familyData.adults}</div>
  //          <div onClick={clickEvent} className="adults-plus material-icons">add_circle</div>
  //       </div>
  //       <div className="week-switcher">
  // <div onClick={clickEvent} className="adultsdiet-minus material-icons">remove_circle</div>
  //         <div id="adultsdiet-value" className="adultsdiet-value">{familyData.adultsdiet}</div>
  //         <div onClick={clickEvent} className="adultsdiet-plus material-icons">add_circle</div>
  //       </div>
  //       </>)
  // }

  return (
    <div className="planner">
      <ModeHeader mode="planner" />
      <div className="content">
        {modeBlock()}
      </div>
    </div>

  );
};

export default Planner;
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
