import React from 'react';
import UpdateAll from '../UpdateAll';
const PropertiesJson = require("../json/properties.json");
const DictJson = require("../json/dict.json");

const langsReg = DictJson.langsReg;
let root = document.getElementById("root");

function showMenu(e) {
  const target = e.target.className.split(' ')[0];
  let themesHidden = document.querySelector(".themes-hidden");
  let langsHidden = document.querySelector(".langs-hidden");
  let themes = document.querySelector(".themes");
  let langs = document.querySelector(".langs");
  if (target === "theme") 
  {
    if (themesHidden) themesHidden.className = "themes"
    if (themes) themes.className = "themes-hidden"
  }
  if (target === "lang") {
    if (langsHidden) langsHidden.className = "langs"
    if (langs) langs.className = "langs-hidden"
  }
}

function changeProperties(e) {
  let propertiesChanged = false;
  const target = e.target.className.split(' ')[0];
  let themes = document.querySelector(".themes");
  let langs = document.querySelector(".langs");
  if (DictJson.langsList.indexOf(target) != -1) 
  {
    PropertiesJson.language = target;
    propertiesChanged = true;
    langs.className = "langs-hidden"
  }
  if (PropertiesJson.themeList.indexOf(target) != -1) 
  {
    PropertiesJson.theme = target;
    propertiesChanged = true;
    themes.className = "themes-hidden"
  }
  if (propertiesChanged) UpdateAll(PropertiesJson.mode);
}

function header() {
  const themePref = PropertiesJson.theme;
  const themesList = PropertiesJson.themeList;
  const langsList = DictJson.langsList;
  const language = PropertiesJson.language;
  const title = DictJson[language].title;
  const mode = PropertiesJson.mode;
  const auto = "schedule";
  const light = "light_mode";
  const dark = "dark_mode";
  const hours = new Date().getHours();
  const shedule = hours > 18 || hours < 8 ? dark : light;
  const constTheme = themePref === "dark_mode" ? dark : light; 
  const theme = themePref === "schedule" ? shedule : themePref;
  const iconTheme = themePref;
  root.className = theme + " " + mode;
  let themes = [];
  themesList.forEach((el, i) => {
    const classNames = el + " theme material-icons";
    themes.push(<span key={el} className={classNames} onClick={ changeProperties }>{el}</span>)
  })
  let langs = [];
  langsList.forEach((el, i) => {
    const classNames = el + " lang";
    langs.push(<span key={el} className={classNames} onClick={ changeProperties }>{el}</span>)
  })
  return (
    <div className="header">
      <header className="header-header">
          <h1>{ title }</h1>
      </header>
    <div className="buttons">
        <div className="langs-hidden">{ langs }</div>
      <div className="lang-switcher">
        <span className="lang" onClick={ showMenu }>{language}</span>
      </div>
        <div className="themes-hidden">{ themes }</div>
      <div className="theme-switcher">
        <span className="theme material-icons" onClick={ showMenu }>{ iconTheme }</span>
      </div>
      <div className="auth-switcher">
        <span className="auth material-icons">account_circle</span>
        </div>
    </div>
    </div>
  );
}

export default header;
