import {join} from 'path'
import {createReadStream} from 'fs'
import {writeFile, mkdir} from 'mz/fs'

import {dest, series} from 'gulp'
import download from 'gulp-download'
import decompress from 'gulp-decompress'
import convertEncoding from 'gulp-convert-encoding'

import highland from 'highland'
import csv from 'fast-csv'

import {rollup} from 'rollup'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'

import getArea from './lib/get-area.js'
import Tree from './lib/tree.js'

const root = 'http://www.post.japanpost.jp/zipcode/dl'
const urls = [
  `${root}/roman/ken_all_rome.zip`,
  `${root}/jigyosyo/zip/jigyosyo.zip`
]
const files = [
  'cache/KEN_ALL_ROME.CSV',
  'cache/JIGYOSYO.CSV'
]

export const downloadCsv = () => download(urls)
  .pipe(decompress())
  .pipe(convertEncoding({from: 'shift_jis', to: 'utf-8'}))
  .pipe(dest('cache'))

export const generate = async () => {
  const treeA = new Tree()
  const treeB = new Tree()
  
  await highland(files)
    .flatMap(file => highland(createReadStream(file)))
    .through(csv())
    .map(arr => arr.length == 7 ? {zip: arr[0], pref: arr[1]} : {zip: arr[7], pref: arr[3]})
    .tap(({zip, pref}) => {
      treeA.add(zip, getArea(pref, 'A'))
      treeB.add(zip, getArea(pref, 'B'))
    })
    .collect()
    .toPromise(Promise)
  
  const data = {
    a: treeA.generate().join(' '),
    b: treeB.generate().join(' ')
  }
  await writeFile(join('cache', 'data.json'), JSON.stringify(data))
}

export const rollupMe = async () => {
  const bundle = await rollup({
    input: 'src/index.js',
    plugins: [json(), uglify()]
  })
  await bundle.write({file: 'dist/index.js', format: 'es'})
  await bundle.write({file: 'dist/umd.js', format: 'umd', name: 'westOrEast'})
}

export default series(downloadCsv, generate, rollupMe)
