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

export const getSelectedCourses = () => JSON.parse(localStorage.getItem('selectedCourses') || '{}');

export const setSelectedCourses = (currentSelectedCourses) => {
  const oldSelectedCourses = getSelectedCourses();
  const selectedCourses = {
    ...oldSelectedCourses,
    ...currentSelectedCourses,
  };
  localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
};
