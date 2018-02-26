export default class Tree {
  constructor () {
    this.root = {area: 'u'}
  }
  
  /**
   * Add a new code/area pair to the tree
   * @param {string} code - zip code as seven digits
   * @param {string} area - 'w' or 'e'
   */
  add (code, area) {
    code = code.toString().replace(/[^\d]/, '').padStart(7, '0') // Normalize input

    let cursor = this.root
    let prefix = ''
    for (const column of code.split('')) {
      prefix += column
      if (cursor[column] && cursor[column].area != area) cursor[column].area = 'u'
      else cursor[column] = {prefix, area}
      cursor = cursor[column]
    }
  }
  
  /**
   * Generate prefixes
   */
  generate () {
    const prefixes = []
    const sub = cursor => {
      if (cursor.area == 'w') return prefixes.push(cursor.prefix)
      if (cursor.area == 'e') return
      const keys = Object.keys(cursor).filter(key => !['prefix', 'area'].includes(key))
      if (keys.length === 0) throw new Error('Unexpected case detected') // We assume that there's no leaf with 'u'
      for (const key of keys) sub(cursor[key])
    }
    sub(this.root)
    return prefixes
  }
}
