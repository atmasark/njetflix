import convertToCamelCase from './convertToCamelCase';
import movieData from '../../mockdata.json';

// Mock data has been fetched from a public API, so the data has to be filtered
const keyArray = ['id', 'title', 'year', 'rated', 'genre', 'director', 'actors', 'plot', 'poster', 'imdbRating'];

// Go thru an object recursively to convert keys to camelCase
const eachRecursive = (obj: object) => {
  for (const k in obj) {
    // If value is object, go into it recursively
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      eachRecursive(obj[k]);
    }
    const newK = convertToCamelCase(k);
    if (keyArray.includes(newK)) {
      obj[newK] = obj[k];
      if (newK !== k) {
        delete obj[k];
      }
    } else delete obj[k];
  }
  return obj;
};

export default movieData.map((obj: object, index: number) => eachRecursive({ ...obj, id: index }));
