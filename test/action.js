import assert from 'assert';
import { test } from 'eater/runner';
import { cookie } from '../src';

test('get', () => {
  const action = cookie('foo');
  assert.deepEqual(action, {
    type: 'EFFECT_GET_COOKIE',
    payload: {
      name: 'foo',
    },
  });
});

test('set', () => {
  const action = cookie('foo', 'bar');
  assert.deepEqual(action, {
    type: 'EFFECT_SET_COOKIE',
    payload: {
      name: 'foo',
      value: 'bar',
      options: {},
    },
  });
});

test('set with options', () => {
  const action = cookie('foo', 'bar', { maxAge: 100 });
  assert.deepEqual(action, {
    type: 'EFFECT_SET_COOKIE',
    payload: {
      name: 'foo',
      value: 'bar',
      options: {
        maxAge: 100,
      },
    },
  });
});
