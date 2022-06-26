import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export const addKeys = (data) => {
  if (!data.length) return [];
  if (data[0].id) return data;
  if (data[0].code) {
    const codeMap = Object.fromEntries(data.map((item) => ([item.code, {
      ...item,
      id: item.code,
    }])));
    return Object.values(codeMap);
  }
  return data.map((item, index) => ({ ...item, id: item.code || index }));
};

const decodeEntities = (() => {
  // https://stackoverflow.com/questions/5796718/html-entity-decode
  // this prevents any overhead from creating the object each time
  const element = document.createElement('div');

  const decodeHTMLEntities = (oldStr) => {
    let str = oldStr;
    if (str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  };

  return decodeHTMLEntities;
})();

export const processStr = (str) => {
  // convert HTML to text only

  // remove HTML entities from str
  if (typeof str !== 'string') return str;
  let oldStr = '';
  let newStr = str;
  while (oldStr !== newStr) {
    oldStr = newStr;
    newStr = newStr
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&nbsp;/g, ' ');
  }
  return decodeEntities(newStr);
};

export const camelCaseToWords = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map((x) => x[0].toUpperCase() + x.substring(1).toLowerCase())
    .join(' ');
};

export const getLocalStorage = (key, defaultValue = {}) => JSON.parse(localStorage.getItem(key))
  || defaultValue;

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSelectedCourses = () => getLocalStorage('selectedCourses');

export const setSelectedCourses = (currentSelectedCourses) => {
  const oldSelectedCourses = getSelectedCourses();
  const selectedCourses = {
    ...oldSelectedCourses,
    ...currentSelectedCourses,
  };
  setLocalStorage('selectedCourses', selectedCourses);
};

export const generatePlanSettings = async (selectedYear, plan) => {
  let { groups } = plan.modules[selectedYear.year];
  if (groups.filter((group) => group.type === 'Additional').length === 0) {
    groups.push({
      title: 'Additional Course Choice',
      type: 'Additional',
      message: plan.modules[selectedYear.year].additionalCourseChoice || '',
      modules: [],
    });
  }

  groups = groups.map((group) => {
    const res = group;
    res.creditSum = 0;
    res.modules.forEach((module) => {
      res.creditSum += 1 * module.credits;
    });

    if (res.type === 'Compulsory') {
      res.creditLow = res.creditSum;
      res.creditHigh = res.creditSum;
    } else if (res.type === 'Alternative') {
      res.creditLow = 0;
      res.creditHigh = 120;
    } else {
      const matchLow = res.message.match(/minimum of ([0-9]+)/);
      const matchHigh = res.message.match(/maximum of ([0-9]+)/);
      if (matchLow) res.creditLow = 1 * matchLow[1];
      else res.creditLow = 0;
      if (matchHigh) res.creditHigh = 1 * matchHigh[1];
      else res.creditHigh = 120;
    }
    return res;
  });

  const creditSum = 120;
  const semesterLow = 50;
  const semesterHigh = 70;
  const groupLow = groups.map((group) => group.creditLow);
  const groupHigh = groups.map((group) => group.creditHigh);

  return {
    groups,
    creditSum,
    semesterHigh,
    semesterLow,
    groupHigh,
    groupLow,
    selectedYear,
  };
};
