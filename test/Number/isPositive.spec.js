import test from 'ava'

const isPositive = require('../../src/Number')

test('success with positive number', t => {
  t.true((1).isPositive())
})

test('fails with negative number', t => {
  t.false((-1).isPositive())
})

test('fails with invalid type', t => {
  t.throws(() => { ''.isPositive() }, '"".isPositive is not a function')
})

test('fails with 0 number', t => {
  t.false((0).isPositive())
})
