/* eslint-env mocha */
import {equal} from 'assert'
import westOrEast from '../dist/'

const nagoya = '4500001'

describe('westOrEast', () => {
  it('Nagoya is west', async () => {
    equal(westOrEast(nagoya), 'w')
  })
  it('Nagoya is west with Pattern A', async () => {
    equal(westOrEast(nagoya, 'A'), 'w')
  })
  it('Nagoya is east with Pattern B', async () => {
    equal(westOrEast(nagoya, 'B'), 'e')
  })
})
