/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const PropertiesJson = require('../json/properties.json');
const DictJson = require('../json/dict.json');

function Modal(props) {
  const { language } = PropertiesJson;
  // const receiptOverviewTitle = DictJson[language].receiptOverview;
  const { show, closeModal } = props;
  const receipt = JSON.parse(localStorage.getItem('modalSee'));
  if (!receipt) return (<div className="modal-empty" />);
  if (receipt.length === 0) return (<div className="modal-empty" />);
  const { source } = DictJson[language];
  const { sourceTitle } = DictJson[language];
  const { portions } = DictJson[language];
  const timerDescription = DictJson[language].portions;

  const strDescriptionBlock = [];
  let strDrinkAlternateBlock = (<div className="receipt-drink-alternate" />);
  let strSubCategoryBlock = (<div className="receipt-cat" />);
  let strAreaBlock = (<div className="receipt-cat" />);
  let strTagsBlock = (<div className="receipt-tags" />);
  let strYoutubeBlock = (<div className="receipt-youtube" />);
  const receiptIngredientEmpty = (<div className="receipt-ingredient-empty" />);
  let receiptIngredient1Block = (<div className="receipt-ingredient 1" />);
  let receiptIngredient2Block = receiptIngredientEmpty;
  let receiptIngredient3Block = receiptIngredientEmpty;
  let receiptIngredient4Block = receiptIngredientEmpty;
  let receiptIngredient5Block = receiptIngredientEmpty;
  let receiptIngredient6Block = receiptIngredientEmpty;
  let receiptIngredient7Block = receiptIngredientEmpty;
  let receiptIngredient8Block = receiptIngredientEmpty;
  let receiptIngredient9Block = receiptIngredientEmpty;
  let receiptIngredient10Block = receiptIngredientEmpty;
  let receiptIngredient11Block = receiptIngredientEmpty;
  let receiptIngredient12Block = receiptIngredientEmpty;
  let receiptIngredient13Block = receiptIngredientEmpty;
  let receiptIngredient14Block = receiptIngredientEmpty;
  let receiptIngredient15Block = receiptIngredientEmpty;
  let receiptIngredient16Block = receiptIngredientEmpty;
  let receiptIngredient17Block = receiptIngredientEmpty;
  let receiptIngredient18Block = receiptIngredientEmpty;
  let receiptIngredient19Block = receiptIngredientEmpty;
  let receiptIngredient20Block = receiptIngredientEmpty;
  let receiptInstruction = (<div className="receipt-instruction" />);

  if (receipt) {
    if (receipt.arrNutrition && receipt.arrNutrition !== []) {
      const nutritionBlockInn = [];
      receipt.arrNutrition.forEach((el, i) => {
        const keyNutr = `nutrition ${i}`;
        const keyNutrName = `nutrition-name ${i}`;
        const keyNutrWeight = `nutrition-weight ${i}`;
        const keyNutrMeasure = `nutrition-measure ${i}`;
        nutritionBlockInn.push(
          <div key={keyNutr} className={keyNutr}>
            <div className={keyNutrName}>{el.name}</div>
            <div className={keyNutrWeight}>{el.weight}</div>
            <div className={keyNutrMeasure}>{el.measure}</div>
          </div>,
        );
      });
      const nutritionBlock = (<div key="nutritins" className="nutritions">{nutritionBlockInn}</div>);
      strDescriptionBlock.push(nutritionBlock);
    }
    if (receipt.strTags && receipt.strTags !== []) {
      const tagBlockInn = [];
      receipt.strTags.forEach((el, i) => {
        const keyTag = `tag ${i}`;
        tagBlockInn.push(<div key={keyTag} className="tag">{el}</div>);
      });
      strTagsBlock = (<div className="receipt-tags">{tagBlockInn}</div>);
    // strDescriptionBlock.push(strTagsBlock);
    }

    if (receipt.strDescription) strDescriptionBlock.push(<div className="receipt-description">{receipt.strDescription}</div>);
    if (receipt.strDrinkAlternate) strDrinkAlternateBlock = (<div className="receipt-drink-alternate">{receipt.strDrinkAlternate}</div>);
    if (receipt.strSubCategory) strSubCategoryBlock = (<div className="receipt-subcat">{receipt.strSubCategory}</div>);
    if (receipt.strArea) strAreaBlock = (<div className="receipt-area">{receipt.strArea}</div>);
    if (receipt.strYoutube) strYoutubeBlock = (<div className="receipt-youtube">{receipt.strYoutube}</div>);

    if (receipt.strInstructions && receipt.strInstructions !== []) {
      receiptInstruction = [];
      receipt.strInstructions.forEach((str, i) => {
        const keyI = `${i} step-instruction`;
        receiptInstruction.push(<div key={keyI} className={keyI}>{str}</div>);
      });
    }

    if (receipt.strIngredient1) {
      receiptIngredient1Block = (
        <div className="receipt-ingredient 1">
          <div className="receipt-ingredient-name">{receipt.strIngredient1}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure1}</div>
        </div>
      );
    }
    if (receipt.strIngredient2) {
      receiptIngredient2Block = (
        <div className="receipt-ingredient 2">
          <div className="receipt-ingredient-name">{receipt.strIngredient2}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure2}</div>
        </div>
      );
    }
    if (receipt.strIngredient3) {
      receiptIngredient3Block = (
        <div className="receipt-ingredient 3">
          <div className="receipt-ingredient-name">{receipt.strIngredient3}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure3}</div>
        </div>
      );
    }
    if (receipt.strIngredient4) {
      receiptIngredient4Block = (
        <div className="receipt-ingredient 4">
          <div className="receipt-ingredient-name">{receipt.strIngredient4}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure4}</div>
        </div>
      );
    }
    if (receipt.strIngredient5) {
      receiptIngredient5Block = (
        <div className="receipt-ingredient 5">
          <div className="receipt-ingredient-name">{receipt.strIngredient5}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure5}</div>
        </div>
      );
    }
    if (receipt.strIngredient6) {
      receiptIngredient6Block = (
        <div className="receipt-ingredient 18">
          <div className="receipt-ingredient-name">{receipt.strIngredient6}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure6}</div>
        </div>
      );
    }
    if (receipt.strIngredient7) {
      receiptIngredient7Block = (
        <div className="receipt-ingredient 18">
          <div className="receipt-ingredient-name">{receipt.strIngredient7}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure7}</div>
        </div>
      );
    }
    if (receipt.strIngredient8) {
      receiptIngredient8Block = (
        <div className="receipt-ingredient 8">
          <div className="receipt-ingredient-name">{receipt.strIngredient8}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure8}</div>
        </div>
      );
    }
    if (receipt.strIngredient9) {
      receiptIngredient9Block = (
        <div className="receipt-ingredient 18">
          <div className="receipt-ingredient-name">{receipt.strIngredient9}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure9}</div>
        </div>
      );
    }
    if (receipt.strIngredient10) {
      receiptIngredient10Block = (
        <div className="receipt-ingredient 10">
          <div className="receipt-ingredient-name">{receipt.strIngredient10}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure10}</div>
        </div>
      );
    }
    if (receipt.strIngredient11) {
      receiptIngredient11Block = (
        <div className="receipt-ingredient 11">
          <div className="receipt-ingredient-name">{receipt.strIngredient11}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure11}</div>
        </div>
      );
    }
    if (receipt.strIngredient12) {
      receiptIngredient12Block = (
        <div className="receipt-ingredient 12">
          <div className="receipt-ingredient-name">{receipt.strIngredient12}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure12}</div>
        </div>
      );
    }
    if (receipt.strIngredient13) {
      receiptIngredient13Block = (
        <div className="receipt-ingredient 13">
          <div className="receipt-ingredient-name">{receipt.strIngredient13}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure13}</div>
        </div>
      );
    }
    if (receipt.strIngredient14) {
      receiptIngredient14Block = (
        <div className="receipt-ingredient 14">
          <div className="receipt-ingredient-name">{receipt.strIngredient14}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure14}</div>
        </div>
      );
    }
    if (receipt.strIngredient15) {
      receiptIngredient15Block = (
        <div className="receipt-ingredient 15">
          <div className="receipt-ingredient-name">{receipt.strIngredient15}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure15}</div>
        </div>
      );
    }
    if (receipt.strIngredient16) {
      receiptIngredient16Block = (
        <div className="receipt-ingredient 16">
          <div className="receipt-ingredient-name">{receipt.strIngredient16}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure16}</div>
        </div>
      );
    }
    if (receipt.strIngredient17) {
      receiptIngredient17Block = (
        <div className="receipt-ingredient 17">
          <div className="receipt-ingredient-name">{receipt.strIngredient17}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure17}</div>
        </div>
      );
    }
    if (receipt.strIngredient18) {
      receiptIngredient18Block = (
        <div className="receipt-ingredient 18">
          <div className="receipt-ingredient-name">{receipt.strIngredient18}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure18}</div>
        </div>
      );
    }
    if (receipt.strIngredient19) {
      receiptIngredient19Block = (
        <div className="receipt-ingredient 19">
          <div className="receipt-ingredient-name">{receipt.strIngredient19}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure19}</div>
        </div>
      );
    }
    if (receipt.strIngredient20) {
      receiptIngredient20Block = (
        <div className="receipt-ingredient 20">
          <div className="receipt-ingredient-name">{receipt.strIngredient20}</div>
          <div className="receipt-ingredient-dotted" />
          <div className="receipt-ingredient-measure">{receipt.strMeasure20}</div>
        </div>
      );
    }
  }

  return (
    <>
      <div className={show ? 'overlay' : 'hide'} onClick={closeModal} />
      <div className={show ? 'modal' : 'hide'}>
        <button onClick={closeModal} className="close material-icons">cancel</button>
        <div className="modal-receipt">
          <div className="receipt-meal"><h2>{receipt.strMeal}</h2></div>
          <div className="receipt-category">
            {/* <div className="receipt-cat">{receipt.strRequestsCounter}</div> */}
            <div className="receipt-cat">{receipt.strCategory}</div>
            {strSubCategoryBlock}
            {strAreaBlock}
            {strTagsBlock}
            <div className="receipt-source"><a target="_blank" rel="noreferrer" href={receipt.strSource} title={sourceTitle}>{source}</a></div>
            {strYoutubeBlock}
          </div>
          {strDrinkAlternateBlock}
          <div className="receipt-thumb"><img src={receipt.strMealThumb} alt={receipt.strMeal} /></div>
          <div className="receipt-descriptions">{strDescriptionBlock}</div>
          <div className="receipt-ingredients">
            <div className="receipt-persons">
              {/* <div  className="receipt-minus material-icons">remove_circle</div>  */}
              <div className="timer" alt={timerDescription}>
                <div className="timer-icon material-icons">timelapse</div>
                <div className="timer-value">{receipt.strTimer ? receipt.strTimer : null}</div>
              </div>
              <div className="persons-descript">{portions}</div>
              <div id="persons-value" className="persons-value">{receipt.strForPersons}</div>
            </div>
            {receiptIngredient1Block}
            {receiptIngredient2Block}
            {receiptIngredient3Block}
            {receiptIngredient4Block}
            {receiptIngredient5Block}
            {receiptIngredient6Block}
            {receiptIngredient7Block}
            {receiptIngredient8Block}
            {receiptIngredient9Block}
            {receiptIngredient10Block}
            {receiptIngredient11Block}
            {receiptIngredient12Block}
            {receiptIngredient13Block}
            {receiptIngredient14Block}
            {receiptIngredient15Block}
            {receiptIngredient16Block}
            {receiptIngredient17Block}
            {receiptIngredient18Block}
            {receiptIngredient19Block}
            {receiptIngredient20Block}
          </div>
          <div className="receipt-instruction">
            {receiptInstruction}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
