/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable operator-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const PropertiesJson = require('../json/properties.json');
const DictJson = require('../json/dict.json');

function FamilyModes() {
  const { language } = PropertiesJson;
  const familyModesProp = PropertiesJson.familyModes;
  const adultsTitle = DictJson[language].adults;
  const adultsDietTitle = DictJson[language].adultsDiet;
  const childrenTitle = DictJson[language].children;
  const childrenDietTitle = DictJson[language].childrenDiet;
  const petsTitle = DictJson[language].pets;
  const familyModesArr = [];
  familyModesProp.forEach((mode) => {
    const classNameMode = `${mode} family-mode`;
    familyModesArr.push(<div key={mode} className={classNameMode}>{DictJson[language][mode]}</div>);
  });

  const familyMode = familyModesProp[0];
  const localComplete = JSON.parse(localStorage.getItem('hgp-family'));
  const prefComplete = PropertiesJson[familyMode];
  const complete = localComplete || prefComplete;

  const clickEvent = (e) => {
    const target = e.target.classList[0];
    if (target.match(/-plus|-minus/) && target.match(/adults|children/)) {
      const propTarget = target.split('-');
      const propCat = propTarget[0];
      const propIncr = propTarget[1];
      const valueId = `${propCat}-value`;
      const value = document.getElementById(valueId);
      if (propIncr === 'plus') {
        complete[propCat] = complete[propCat] + 1;
        value.innerText = complete[propCat];
      }
      if (propIncr === 'minus' && complete[propCat] > 0) {
        complete[propCat] = complete[propCat] - 1;
        value.innerText = complete[propCat];
      }
    }

    if (!target.match(/adults|children/)) {
      const propTarget = target.split('-');
      const propCat = propTarget[0];
      const propIncr = propTarget[1];
      const classId = propCat;
      const value = document.getElementById(classId);
      const indxPet = complete.pets.indexOf(propCat);

      const petsArr = complete.pets;
      if (propIncr === 'plus') {
        // console.log('plus');
        // complete.pets[propCat] = complete.pets[propCat];
        // value.innerText = complete[propCat];
      }
      if (propIncr === 'minus') {
        if (indxPet !== -1) petsArr.splice(indxPet, 1);
        value.remove();
        // complete[propCat] = complete[propCat] + 1;
        // value.innerText = complete[propCat];
      }
    }

    localStorage.setItem('hgp-family', JSON.stringify(complete));
  };

  const adultsBlock = () => (
    <div className="adults">
      <div className="adults-header">{adultsTitle}</div>
      <div className="adults-icon" />
      <div className="adults-switcher">
        <div onClick={clickEvent} className="adults-minus material-icons">remove_circle</div>
        <div id="adults-value" className="adults-value">{complete.adults}</div>
        <div onClick={clickEvent} className="adults-plus material-icons">add_circle</div>
      </div>
      <div className="adultsdiet-header">{adultsDietTitle}</div>
      <div className="adultsdiet-switcher">
        <div onClick={clickEvent} className="adultsdiet-minus material-icons">remove_circle</div>
        <div id="adultsdiet-value" className="adultsdiet-value">{complete.adultsdiet}</div>
        <div onClick={clickEvent} className="adultsdiet-plus material-icons">add_circle</div>
      </div>
    </div>
  );

  const childrenBlock = (
    <div className="children">
      <div className="children-header">{childrenTitle}</div>
      <div className="children-icon" />
      <div className="children-switcher">
        <div onClick={clickEvent} className="children-minus material-icons">remove_circle</div>
        <div id="children-value" className="children-value">{complete.children}</div>
        <div onClick={clickEvent} className="children-plus material-icons">add_circle</div>
      </div>
      <div className="childrendiet-header">{childrenDietTitle}</div>
      <div className="childrendiet-switcher">
        <div onClick={clickEvent} className="childrendiet-minus material-icons">remove_circle</div>
        <div id="childrendiet-value" className="childrendiet-value">{complete.childrendiet}</div>
        <div onClick={clickEvent} className="childrendiet-plus material-icons">add_circle</div>
      </div>
    </div>
  );
  const pets = [];
  complete.pets.forEach((pet) => {
    const minusCN = `${pet}-minus material-icons`;
    const valueClassName = `${pet}-value`;
    const petClassName = `${pet} pet`;
    const block = (
      <div id={pet} key={petClassName} className={petClassName}>
        <div key={valueClassName} className="pets-switcher">
          <div key={valueClassName} className={valueClassName}>{pet}</div>
          <div onClick={clickEvent} key={minusCN} className={minusCN}>remove_circle</div>
        </div>
      </div>
    );
    pets.push(block);
  });
  const petsBlock = (
    <div className="pets">
      <div className="pets-header">
        {petsTitle}
        <div onClick={clickEvent} className="pets-plus material-icons">add_circle</div>
      </div>
      <div id="pets-icon" className="pets-icon" />
      <div className="pets-list">
        {pets}
      </div>
    </div>
  );

  return (
    <div className="content">
      <div className="family-modes">
        { familyModesArr }
      </div>
      <div className="mode-family">
        {adultsBlock()}
        {childrenBlock}
        {petsBlock}
      </div>
    </div>
  );
}
export default FamilyModes;
