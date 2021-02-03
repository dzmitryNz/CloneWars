/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
import React from 'react';
import UpdateAll from './UpdateAll';

const PropertiesJson = require('./json/properties.json');
const DictJson = require('./json/dict.json');

const nextMode = () => {
  const { modes } = PropertiesJson;
  const root = document.getElementById('root');
  const rootClassList = root.classList;
  const indexMode = modes.indexOf(rootClassList[1]);
  const ClassName = indexMode === modes.length - 1 ? modes[0] : modes[indexMode + 1];
  // root.classList.remove(rootClassList[1]);
  // root.classList.add(ClassName);
  UpdateAll(ClassName);
};

function ModeHeader(data) {
  const modeTitle = `${data.mode}Title`;
  const { language } = PropertiesJson;
  const headerTitle = DictJson[language][modeTitle];
  const { next } = DictJson[language];
  const headerClassName = `${data.mode}-header`;
  const nextButton = (
    <div onClick={nextMode} className="next-button">
      {next}
      <div className="material-icons">arrow_forward_ios</div>
    </div>
  );
  const button = data.mode === 'export' ? null : nextButton;
  return (
    <header className={headerClassName}>
      <h2>{ headerTitle }</h2>
      { button }
    </header>
  );
}

export default ModeHeader;
