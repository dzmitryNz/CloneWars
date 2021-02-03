const setMap = (value) => {
  const result = new Map();
  if (value) {
    const stakanMeas = 200;
    const konchNoghaMeas = 1;
    const schepotkaMeas = 3;
    const chaynLoghkMeas = 5;
    const stolLoghkMeas = 20;
    if (value === 'на кончике ножа') {
      result.set('г', konchNoghaMeas);
      return result;
    }
    if (value === 'по вкусу' || value === 'щепотка') {
      result.set('г', schepotkaMeas);
      return result;
    }
    const spl = value.split(' ');
    if (spl[1].match(/стак/)) {
      result.set('г', Number(spl[0]) * stakanMeas);
      return result;
    }
    if (spl.length === 3 && spl[2].match(/ложк/)) {
      if (spl[1].match(/чайн/)) result.set('г', Number(spl[0]) * chaynLoghkMeas);
      if (spl[1].match(/стол/)) result.set('г', Number(spl[0]) * stolLoghkMeas);
      return result;
    }

    result.set(spl[1], Number(spl[0]));
    return result;
  } return result;
};

export default setMap;
