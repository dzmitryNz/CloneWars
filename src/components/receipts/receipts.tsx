// doc for this module /docs/Receipts.md

import CSS from 'csstype';
import React from 'react';
import Button from "../Button";
import UpdateAll from "../UpdateAll";
const PropertiesJson = require("../json/properties.json");
const DictJson = require("../json/dict.json");
const edaruReceipts = require("../json/edaru-receipts.json");
const ingedients = require("../json/ingredients.json");

const handleClick = () => { UpdateAll("mode_receipts") };

function Receipts() {
  const language = PropertiesJson.language;
  const receiptsTitle = DictJson[language].receiptsTitle;
  const next = DictJson[language].next;

  let receipts = [];
  let ingredients = [];
  edaruReceipts.forEach((el, i) => {
    if (el.strCategory === "Салаты") {
    const classNames = " receipt";
    const background = "url(" + el.strMealThumb + ")";
    const backgroundStyle: CSS.Properties = {
  background: background,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
};
    const newBlock = <div key={ i } className={ classNames } onClick={ handleClick } style={ backgroundStyle }>
      <span className="receipt-category">{ el.strCategory }</span>
      <span className="receipt-area">{ el.strArea }</span>  
       <div className="receipt-name">{ el.strMeal }</div>
       <div className="receipt-ingredients">{ ingredients }</div>
    </div>;
    receipts.push(newBlock)
    }
  })
  return (
    <div className="receipts">
      <header className="receipts-header">
          <h2 onClick={ handleClick }>{ receiptsTitle }</h2>
      </header>
      <div className="wrapper">
        <div className="content">
          { receipts }
        </div>
        <div className="buttons">
        <Button buttonName = { next } target = "mode_ingredients" />
        </div>
      </div>
    </div>
  );
}

export default Receipts;
