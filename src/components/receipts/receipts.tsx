// doc for this module /docs/Receipts.md

import React from 'react';
import Button from "../Button";
const PropertiesJson = require("../json/properties.json");
const DictJson = require("../json/dict.json");

const language = PropertiesJson.language;
const receiptsTitle = DictJson[language].receiptsTitle;
const next = DictJson[language].next;

function Receipts() {
  return (
    <div className="receipts">
      <header className="receipts-header">
          <h2>{ receiptsTitle }</h2>
      </header>
            <div className="wrapper">
        <div className="content">
        </div>
        <Button buttonName = { next } target = "mode_ingredients" />
      </div>
    </div>
  );
}

export default Receipts;
