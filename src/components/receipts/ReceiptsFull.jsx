/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from './ReceiptModal';
import ModeHeader from '../modeHeader';

const PropertiesJson = require('../json/properties.json');
const DictJson = require('../json/dict.json');

let favLocal = JSON.parse(localStorage.getItem('hgp-favorite'));
let menuLocal = JSON.parse(localStorage.getItem('hgp-menu'));
if (!favLocal) favLocal = [];
if (!menuLocal) menuLocal = [];
let category = [];
let categoryBlock = [];
let count = '';

function Receipts() {
  const { language } = PropertiesJson;
  const categoryStr = PropertiesJson.category;
  const [data, setData] = useState([]);
  const [categoriesData, setCategories] = useState([]);
  const [recentsData, setRecents] = useState([]);
  const [favoritesData, setFavorites] = useState([]);
  const [menusData, setMenus] = useState([]);
  const [query, setQuery] = useState('Основные блюда');
  const [menus, setMenusList] = useState(menuLocal);
  const [favorite, setFarvoritesList] = useState(favLocal);
  const [recent] = useState(favLocal);
  const [categoryHeader, setCategoryHeader] = useState(categoryStr);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ignore = false;
    const { serverUrl } = PropertiesJson;
    // const favLocal = JSON.parse(localStorage.getItem("hgp-favorite"));
    // const menuLocal = JSON.parse(localStorage.getItem("hgp-menu"));

    async function fetchData() {
      const categoryUrl = `${serverUrl}/rec/cat/`;
      const categoryResult = await axios(categoryUrl + query);
      if (!ignore) setData(categoryResult.data);

      const categoriesResult = await axios(categoryUrl);
      if (!ignore) setCategories(categoriesResult.data);
    }
    fetchData();
    return () => { ignore = true; };
  }, [query]);

  useEffect(() => {
    let ignore = false;
    const { serverUrl } = PropertiesJson;
    const popularUrl = `${serverUrl}/rec/popular`;

    async function fetchRecents() {
      const recentsResult = await axios(popularUrl);
      if (!ignore) setRecents(recentsResult.data);
    }
    fetchRecents();
    return () => { ignore = true; };
  }, [recent]);

  useEffect(() => {
    let ignore = false;
    const { serverUrl } = PropertiesJson;
    // const menuLocal = JSON.parse(localStorage.getItem("hgp-menu"));
    async function fetchMenu() {
      const arrayUrl = `${serverUrl}/rec/array`;
      const menusArr = menus || [];
      const regExMenu = menusArr.join('|');
      let configMenu = { };
      let menusResult = { data: {} };
      if (regExMenu.length !== 0) {
        configMenu = { el: 'idMeal', reg: regExMenu, cat: count };
        menusResult = await axios.post(arrayUrl, configMenu);
      }
      if (!ignore) setMenus(menusResult.data);
    }

    fetchMenu();

    return () => { ignore = true; };
  }, [menus]);

  useEffect(() => {
    let ignore = false;
    const { serverUrl } = PropertiesJson;
    // const favLocal = JSON.parse(localStorage.getItem("hgp-favorite"));
    async function fetchFavorites() {
      const arrayUrl = `${serverUrl}/rec/array`;
      const favoritesArr = favorite || PropertiesJson.favorites;
      const regExFav = favoritesArr.join('|');
      // console.log(regExFav, favoritesArr, regExFav === [] ? true : false)
      let favoritesResult = { data: {} };
      let configFav = {};
      if (regExFav.length !== 0) {
        configFav = { el: 'idMeal', reg: regExFav };
        favoritesResult = await axios.post(arrayUrl, configFav);
      }
      if (!ignore) setFavorites(favoritesResult.data);
    }
    fetchFavorites();
    return () => { ignore = true; };
  }, [favorite]);

  // console.log(data, categoriesData)

  const changeCategory = (e) => {
    // console.log(e.target.innerText);
    setQuery(e.target.innerText);
    setCategoryHeader(e.target.innerText);
    document.querySelector('.active-category').classList.remove('active-category');
    e.target.classList.add('active-category');
  };

  const openModal = (e) => {
    const target = e.target.classList[0];
    const from = e.target.classList[1].split('-')[0];

    let receiptSee = {};
    switch (from) {
      case ('recent'):
        receiptSee = recentsData[target];
        break;
      case ('receipt'):
        receiptSee = category[target];
        break;
      case ('favorite'):
        receiptSee = favoritesData[target];
        break;
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

  const closeModal = () => setShow(false);

  const updateFavorite = (target, favN) => {
    let favNew = favN;
    if (target) {
      favNew.push(target);
      const favSet = new Set(favNew);
      favNew = Array.from(favSet);
    }
    localStorage.setItem('hgp-favorite', JSON.stringify(favNew));
    PropertiesJson.favorites = favNew;
    setFarvoritesList(favNew);
  };

  const updateMenu = (target, menuN) => {
    let menuNew = menuN;
    if (target) {
      menuNew.push(target);
      const menuSet = new Set(menuNew);
      menuNew = Array.from(menuSet);
    }
    localStorage.setItem('hgp-menu', JSON.stringify(menuNew));
    PropertiesJson.menu = menuNew;
    setMenusList(menuNew);
  };

  const addFavorite = (e) => {
    favLocal = JSON.parse(localStorage.getItem('hgp-favorite'));
    const target = e.target.classList[0];
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

  const addMenu = (e) => {
    menuLocal = JSON.parse(localStorage.getItem('hgp-menu'));
    const target = e.target.classList[0];
    const menuNew = menuLocal ? menuLocal = Array.from(menuLocal) : [];
    count = target;
    updateMenu(target, menuNew);
  };

  const removeMenu = (e) => {
    menuLocal = JSON.parse(localStorage.getItem('hgp-menu'));
    const target = e.target.classList[0];
    const menuNew = menuLocal ? menuLocal = Array.from(menuLocal) : [];
    menuNew.splice(menuNew.indexOf(target), 1);
    updateMenu(null, menuNew);
  };

  const categories = [];

  categoriesData.forEach((cat, i) => {
    const category0 = cat[0];
    const activeClassName = `${category0} category-name active-category`;
    const categoryClassName = `${category0} category-name`;
    const catClassName = category0 === categoryStr ? activeClassName : categoryClassName;
    categories.push(
      <div key={i} className="list-item">
        <div onClick={changeCategory} className={catClassName}>{category0}</div>
        {/* <div className='category-qty'>{cat[1]}</div> */}
      </div>,
    );
  });

  const recentsArr = [];
  recentsData.forEach((rec, i) => {
    const clasRN = `${i} recent`;
    const clasRM = `${i} recent-meal`;
    const clasRB = `${i} recent-buttons`;
    const clasFvr = `${rec.idMeal} recent-favorite material-icons`;
    const clasAdd = `${rec.idMeal} recent-add material-icons`;

    recentsArr.push(
      <div key={rec.idMeal} className={clasRN}>
        <div className={clasRB}>
          <div onClick={addMenu} className={clasAdd}>add_circle</div>
          <div onClick={addFavorite} className={clasFvr}>favorite_border</div>
        </div>
        <div onClick={openModal} className={clasRM}>{rec.strMeal}</div>
      </div>,
    );
  });

  const favoritesArr = [];
  if (favoritesData.length > 0) {
    favoritesData.forEach((rec, i) => {
      if (rec === 'null') return;
      const clasRN = `${i} favorite`;
      const clasRM = `${i} favorite-meal`;
      const clasRB = `${i} favorite-buttons`;
      const clasFvr = `${rec.idMeal} favorite-favorite material-icons`;
      const clasAdd = `${rec.idMeal} favorite-add material-icons`;

      favoritesArr.push(
        <div key={rec.idMeal} className={clasRN}>
          <div className={clasRB}>
            <div onClick={addMenu} className={clasAdd}>add_circle</div>
            <div onClick={removeFavorite} className={clasFvr}>favorite</div>
          </div>
          <div onClick={openModal} className={clasRM}>{rec.strMeal}</div>
        </div>,
      );
    });
  }

  const empty = (<div className="menue-meal empty">{DictJson[language].emptyHere}</div>);

  const menusArr = [];
  if (menusData.length > 0) {
    menusData.forEach((rec, i) => {
      const clasRN = `${i} menue`;
      const clasRM = `${i} menue-meal`;
      const clasRB = `${i} menue-buttons`;
      const clasFvr = `${rec.idMeal} menue-favorite material-icons`;
      const clasAdd = `${rec.idMeal} menue-add material-icons`;

      menusArr.push(
        <div key={rec.idMeal} className={clasRN}>
          <div className={clasRB}>
            <div onClick={removeMenu} className={clasAdd}>remove_circle</div>
            <div onClick={addFavorite} className={clasFvr}>favorite_border</div>
          </div>
          <div onClick={openModal} className={clasRM}>{rec.strMeal}</div>
        </div>,
      );
    });
  }

  const setCategory = (searchExp, categoryData) => {
    if (!searchExp) category = categoryData;
    else {
      category = categoryData.filter((rec) => rec.strMeal.includes(searchExp.toLowerCase()));
    }
    // console.log(searchExp, category.length)
    categoryBlock = category.map((rec, i) => {
      const clasNm = `${i} receipt`;
      const clasNM = `${i} receipt-meal`;
      const clasNS = `${i} receipt-see`;
      const clasNB = `${i} receipt-buttons`;
      const clasFvr = `${rec.idMeal} receipt-favorite material-icons`;
      const clasAdd = `${rec.idMeal} receipt-add material-icons`;

      const divStyle = {
        backgroundImage: `url(${rec.strMealThumb})`,
      };
      return (
        <div style={divStyle} key={rec.idMeal} className={clasNm}>
          <div className={clasNB}>
            <div onClick={addMenu} className={clasAdd}>add_circle</div>
            <div onClick={addFavorite} className={clasFvr}>favorite_border</div>
          </div>
          <div onClick={openModal} className={clasNS} />
          <div className={clasNM}>{rec.strMeal}</div>
        </div>
      );
    });
  };

  setCategory(null, data);

  return (
    <div id="receipts" className="receipts">
      <ModeHeader mode="receipts" />
      <div className="content">
        <div className="categories">
          <div className="categories-wrapper">
            <div className="categories-list">
              {categories}
            </div>
          </div>
        </div>
        <div id="category" className="category">
          <div className="category-header">
            { categoryHeader }
            {/* <input onChange={e => setCategory(e.target.value, data)} /> */}
          </div>
          <div className="category-content">
            {categoryBlock}
          </div>
        </div>
        <div className="menus">
          <div className="menus-header">{DictJson[language].menu}</div>
          <div className="menus-content">
            {menusArr.length > 0 ? menusArr : empty }
          </div>
        </div>
        <div className="recents">
          <div className="recents-header">{DictJson[language].popular}</div>
          <div className="recents-content">
            {recentsArr}
          </div>
        </div>
        <div className="favorites">
          <div className="favorites-header">{DictJson[language].favorites}</div>
          <div className="favorites-content">
            {favoritesArr.length > 0 ? favoritesArr : empty }
          </div>
        </div>
      </div>
      <Modal closeModal={closeModal} show={show} />
    </div>
  );
}
export default Receipts;
