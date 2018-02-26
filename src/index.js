import data from '../cache/data.json'

/**
 * Get 'w'est or 'e'ast
 * @param {string} code - Zip code for Japan
 * @param {string} pattern - 'A' or 'B'
 * @returns {string} 'w' or 'e'
 */
export default (code, pattern = 'A') => data[pattern.toLowerCase()].split(' ').find(prefix => code.indexOf(prefix) === 0) ? 'w' : 'e'
