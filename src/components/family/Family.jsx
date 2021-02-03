/* eslint-disable import/no-cycle */

import React from 'react';
import ModeHeader from '../modeHeader';
import FamilyModes from './FamilyModes';

const PropertiesJson = require('../json/properties.json');

const localProp = JSON.parse(localStorage.getItem('hgp-properties'));
if (localProp) {
  PropertiesJson.language = localProp.language;
  PropertiesJson.theme = localProp.theme;
  PropertiesJson.mode = localProp.mode;
}

function Family() {
  return (
    <div className="family">
      <ModeHeader mode="family" />
      <FamilyModes />
    </div>
  );
}

export default Family;
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
