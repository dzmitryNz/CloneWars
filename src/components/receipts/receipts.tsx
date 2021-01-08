// doc for this module /docs/Receipts.md

import React from 'react';
import Button from "../Button";
import UpdateAll from "../UpdateAll";
const PropertiesJson = require("../json/properties.json");
const DictJson = require("../json/dict.json");

const handleClick = () => { UpdateAll("mode_receipts") };

function Receipts() {
  const language = PropertiesJson.language;
  const receiptsTitle = DictJson[language].receiptsTitle;
  const next = DictJson[language].next;
  return (
    <div className="receipts">
      <header className="receipts-header">
          <h2 onClick={ handleClick }>{ receiptsTitle }</h2>
      </header>
      <div className="wrapper">
        <div className="content">
          Content Here
        </div>
        <div className="buttons">
        <Button buttonName = { next } target = "mode_ingredients" />
        </div>
      </div>
    </div>
  );
}

export default Receipts;
