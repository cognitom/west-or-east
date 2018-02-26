import eastPrefs from './east-prefs.json'

/**
 * Get an area identifier
 * w: West Japan
 * e: East Japan
 * u: Unknown
 * @param {string} pref - name of prefecture in Japanese Kanji
 * @returns {string} 'w' or 'e'
 */
export default (pref, pattern = 'A') => eastPrefs[pattern].includes(pref) ? 'e' : 'w'
