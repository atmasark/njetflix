import convertToCamelCase from './convertToCamelCase';
import movieData from '../../mockdata.json';

// Mock data has been fetched from a public API, so the data has to be filtered
const keyArray = ['title', 'year', 'rated', 'genre', 'director', 'actors', 'plot', 'poster', 'imdbRating'];

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

export default movieData.map((obj: object) => eachRecursive(obj));
