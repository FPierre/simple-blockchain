import test from 'ava'

const isValidDate = require('../../src/String')

test('success with valid date', t => {
  t.true(('04/09/2017').isValidDate())
})

test('fails with invalid date', t => {
  t.false(('40/09/2017').isValidDate())
})

test('fails with invalid type', t => {
  t.throws(() => { (1).isValidDate() }, '1.isValidDate is not a function')
})
