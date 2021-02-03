/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModeHeader from '../modeHeader';
import setMap from './setMap';
import Modal from '../receipts/ReceiptModal';

const PropertiesJson = require('../json/properties.json');

const DictJson = require('../json/dict.json');

const min = ' мин.';
const hours = ' час. ';
const count = '';
const root = document.getElementById('root').className;

function Ingredients() {
  let hook = false;
  if (root.match(/ingredients/)) hook = true;
  let favLocal = JSON.parse(localStorage.getItem('hgp-favorite'));
  let menuLocal = JSON.parse(localStorage.getItem('hgp-menu'));
  if (!menuLocal) menuLocal = [];
  if (!favLocal) favLocal = [];
  const { language } = PropertiesJson;
  const empty = (<div className="menue-meal empty">{DictJson[language].emptyHere}</div>);
  const [fav, setFav] = useState([favLocal]);
  const [menusData, setMenus] = useState([]);
  const [menus, setMenusList] = useState(menuLocal);
  const [show, setShow] = useState(false);
  // const [ingredients, setIngr] = useState();
  // const [favorite, setFarvoritesList] = useState(favLocal);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    let ignore = false;
    const { serverUrl } = PropertiesJson;
    async function fetchMenu() {
      const arrayUrl = `${serverUrl}/rec/array`;
      const menusArr = menus || [];
      const regExMenu = menusArr.join('|');
      let menusResult = {};
      if (regExMenu.length !== 0) {
        const configMenu = { el: 'idMeal', reg: regExMenu, cat: count };
        menusResult = await axios.post(arrayUrl, configMenu);
      }
      if (!ignore) setMenus(menusResult.data);
    }

    fetchMenu();

    return () => { ignore = true; };
  }, [menus, fav, root, hook]);

  const closeModal = () => setShow(false);

  const openModal = (e) => {
    const target = e.target.classList[0];
    const from = e.target.classList[1].split('-')[0];
    let receiptSee = {};
    switch (from) {
      case ('menue'):
        receiptSee = menusData[target];
        break;
      default:
    }
    if (receiptSee) {
      localStorage.setItem('modalSee', JSON.stringify(receiptSee));
      setShow(true);
    }
  };

  const updateFavorite = (target, favN) => {
    let favNew = favN;
    if (target) {
      favNew.push(target);
      const favSet = new Set(favNew);
      favNew = Array.from(favSet);
    }
    localStorage.setItem('hgp-favorite', JSON.stringify(favNew));
    PropertiesJson.favorites = favNew;
    setFav(favNew);
  };

  const removeMenu = (e) => {
    menuLocal = JSON.parse(localStorage.getItem('hgp-menu'));
    const target = e.target.classList[0];
    const menuNew = menuLocal ? menuLocal = Array.from(menuLocal) : [];
    menuNew.splice(menuNew.indexOf(target), 1);
    setMenusList(menuNew);
    localStorage.setItem('hgp-menu', JSON.stringify(menuNew));
  };

  const addFavorite = (e) => {
    favLocal = JSON.parse(localStorage.getItem('hgp-favorite'));
    const target = e.target.classList[0];
    // console.log(target);
    const favNew = favLocal ? favLocal = Array.from(favLocal) : [];
    updateFavorite(target, favNew);
  };

  const removeFavorite = (e) => {
    favLocal = JSON.parse(localStorage.getItem('hgp-favorite'));
    const target = e.target.classList[0];
    let favNew = favLocal ? favLocal = Array.from(favLocal) : [];
    favNew.splice(favNew.indexOf(target), 1);
    if (favNew === []) favNew = ['null'];
    updateFavorite(null, favNew);
  };

  const menusArr = [];
  const mapArr = [];
  const menuUpdate = () => {
    if (menusData) {
      if (menusData.length > 0) {
        menusData.forEach((rec, i) => {
          const newMap = {
            [rec.idMeal]: rec.strTimer,
            [rec.strIngredient1]: rec.strMeasure1,
            [rec.strIngredient2]: rec.strMeasure2,
            [rec.strIngredient3]: rec.strMeasure3,
            [rec.strIngredient4]: rec.strMeasure4,
            [rec.strIngredient5]: rec.strMeasure5,
            [rec.strIngredient6]: rec.strMeasure6,
            [rec.strIngredient7]: rec.strMeasure7,
            [rec.strIngredient8]: rec.strMeasure8,
            [rec.strIngredient9]: rec.strMeasure9,
            [rec.strIngredient10]: rec.strMeasure10,
            [rec.strIngredient11]: rec.strMeasure11,
            [rec.strIngredient12]: rec.strMeasure12,
            [rec.strIngredient13]: rec.strMeasure13,
            [rec.strIngredient14]: rec.strMeasure14,
            [rec.strIngredient15]: rec.strMeasure15,
            [rec.strIngredient16]: rec.strMeasure16,
            [rec.strIngredient17]: rec.strMeasure17,
            [rec.strIngredient18]: rec.strMeasure18,
            [rec.strIngredient19]: rec.strMeasure19,
            [rec.strIngredient20]: rec.strMeasure20,
            [rec.strIngredient21]: rec.strMeasure21,
            [rec.strIngredient22]: rec.strMeasure22,
            [rec.strIngredient23]: rec.strMeasure23,
            [rec.strIngredient24]: rec.strMeasure24,
            [rec.strIngredient25]: rec.strMeasure25,
          };

          let favAdd = (<div onClick={addFavorite} className={`${rec.idMeal} menue-favorite material-icons`}>favorite_border</div>);
          const favRem = (<div onClick={removeFavorite} className={`${rec.idMeal}  menue-favorite material-icons`}>favorite</div>);
          favAdd = favLocal.indexOf(rec.idMeal) !== -1 ? favRem : favAdd;
          menusArr.push(
            <div key={rec.idMeal} className={`${i} menue`}>
              <div className={`${i} portions`}>
                <div className={`plus ${i} menue-portions`}>+</div>
                <div className={`${i} menue-portions`}>{rec.strForPersons}</div>
                <div className={`minus ${i} menue-portions`}>-</div>
              </div>
              <div onClick={openModal} className={`${i} menue-meal`}>{rec.strMeal}</div>
              <div className={`${i} menue-buttons`}>
                <div onClick={removeMenu} className={`${rec.idMeal} menue-add material-icons`}>remove_circle</div>
                {favAdd}
              </div>
            </div>,
          );
          const map = (Object.entries(newMap));
          mapArr.push(map);
        });
      }
    }
  };

  menuUpdate();

  const ingredientsArr = [];

  const ingredientsUpdate = () => {
    const fullMap = new Map();
    if (mapArr) {
      if (mapArr.length > 0) {
        let mins = 0;
        let hrs = 0;
        mapArr.forEach((map) => {
          map.forEach((key, i) => {
            if (i === 0) {
              // const id = key[0];
              let time = fullMap.get('time') ? fullMap.get('time') : 0;
              const times = key[1].split(' ');

              if (times.length === 2 && times[1].match(/мин/)) mins += Number(times[0]);
              if (times.length === 2 && times[1].match(/час/)) hrs += Number(times[0]);
              if (times.length === 4) {
                mins += Number(times[2]);
                hrs += Number(times[0]);
              }
              if (mins > 60) {
                mins %= 60;
                hrs += 1;
              }
              time = hrs > 0 ? String(hrs) + hours + String(mins) + min : String(mins) + min;
              fullMap.set('time', time);
            } else {
              // console.log(key[0], fullMapKey)
              let value = {};
              if (key[1]) value = setMap(key[1]);
              else { return; }

              const fullMapKey = fullMap.get(key[0]);
              // console.log(key[0], value)
              const keyValue = value.keys().next().value;
              const valueValue = value.values().next().value;
              if (fullMapKey) {
                if (fullMapKey) {
                  const oldValue = fullMapKey.get(keyValue) ? Number(fullMapKey.get(keyValue)) : 0;
                  const newValue = fullMapKey.set(keyValue, oldValue + Number(valueValue));
                  // console.log(fullMapKey + valueValue)
                  fullMap.set(key[0], newValue);
                } else { fullMap.set(key[0], fullMapKey + value); }
              } else { fullMap.set(key[0], value); }
            }
          });
        });
        // console.log(fullMap)
        localStorage.setItem('hgp-ingredients', fullMap);
        // setIngr(fullMap);
        fullMap.forEach((value, key) => {
          let ingredientInner = (<></>);
          if (key === 'time') {
            ingredientsArr.push(
              <div key="time" className="time">
                <div className="time-icon material-icons" />
                <div className="time-title">{DictJson[language].timeTitle}</div>
                <div className="time-value">{value}</div>
              </div>,
            );
          } else {
            const valueArr = value.entries().next().value;
            if (value.size === 1) {
              // console.log(valueArr)
              ingredientInner = (
                <>
                  <div className="ingredient-name">{`${key}`}</div>
                  <div className="ingredient-dotted" />
                  <div className="ingredient-qty">{valueArr[1]}</div>
                  <div className="ingredient-meas">{valueArr[0]}</div>
                </>
              );
            }

            if (value.size > 1) {
              const keysArr = [];
              value.forEach((inValue, inKey) => {
                keysArr.push(<div key={inKey} className="ingredient-gridmeas">{`${inKey}\n${inValue}`}</div>);
              });
              ingredientInner = (
                <>
                  <div className="ingredient-gridname">{`${key}`}</div>
                  <div className="ingredient-dotted" />
                  <div className="ingredient-grid">
                    <div className={`${key} ingredient-gridmeas`}>{keysArr}</div>
                  </div>
                </>
              );
            }
          }
          ingredientsArr.push(
            <div key={`${key} ingredient`} className={`${key} ingredient`}>
              {ingredientInner}
            </div>,
          );
        });
        // console.log(fullMap)
      }
    }
  };

  ingredientsUpdate();

  return (
    <div className="ingredients">
      <ModeHeader mode="ingredients" />
      <div className="content">
        <div className="ingredients-wrapper">
          {/* <div className='ingredients-header'></div> */}
          {ingredientsArr.length > 0 ? ingredientsArr : empty }
        </div>
        <div className="menus">
          <div className="menus-header">{DictJson[language].menu}</div>
          <div key="header-menue" className="header-menue">
            <div className="portions">
              <div className="plus menue-portions" />
              <div className="menue-portions-value">{DictJson[language].portionsIng}</div>
              <div className="minus menue-portions" />
            </div>
            <div className="menue-meal">{DictJson[language].mealName}</div>
            <div className="menue-buttons">
              <div className="menue-favorite material-icons" />
              <div className="menue-add material-icons" />
            </div>
          </div>
          <div className="menus-content">
            {menusArr.length > 0 ? menusArr : empty }
          </div>
        </div>
      </div>
      <Modal closeModal={closeModal} show={show} />
    </div>
  );
}

export default Ingredients;
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
