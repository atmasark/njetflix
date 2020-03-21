import convertToCamelCase from './convertToCamelCase';
import movieData from '../../mockdata.json';
import Movie from '../interfaces/movie';

// Mock data has been fetched from a public API, so the data has to be filtered
// Only take the following keys
const keyArray = ['id', 'title', 'year', 'rated', 'genre', 'director', 'actors', 'plot', 'poster', 'imdbRating'];

/*
* Split the entries into arrays that have a key matching to the array
* (Some of the entries should be arrays
* but they've been joined together with commas)
*/
const splitIntoArray = (key: string, value: string) => {
  const keysToSplit = ['genre', 'director', 'actors'];
  if (keysToSplit.includes(key)) {
    return value.split(', ');
  }
  return value;
};

/*
* Go thru an object recursively to convert keys to camelCase
*/
const eachRecursive = (obj: Movie) => {
  for (const k in obj) {
    // If value is object, go into it recursively
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      eachRecursive(obj[k]);
    }
    const newK = convertToCamelCase(k);
    if (keyArray.includes(newK)) {
      obj[newK] = splitIntoArray(newK, obj[k]);
      if (newK !== k) {
        delete obj[k];
      }
    } else delete obj[k];
  }
  return obj;
};

export default movieData.map((obj: any, index: number) => eachRecursive({ ...obj, id: index }));
