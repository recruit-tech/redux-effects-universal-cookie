import { test } from 'eater/runner';
import assert from 'assert';
import { useFakeTimers } from 'sinon';
import mustCall from 'must-call';
import { cookie } from '../src';
import createStore from './fixtures/createStore';

useFakeTimers();

const cookies = {};
const mockReq = { cookies };
const mockRes = {
  cookie(name, value, options = {}) {
    cookies[name] = { value, options };
  },
  clearCookie(name, options = {}) {
    cookies[name] = { options };
  },
};
const store = createStore(mockReq, mockRes);

test('express, get cookie', () => {
  cookies.foo = '100';
  store.dispatch(cookie('foo')).then(mustCall((result) => {
    assert(result === '100');
  }), assert.fail);
});

test('express, set cookie', () => {
  store.dispatch(cookie('bar', '200', { path: '/' })).then(mustCall(() => {
    assert.deepEqual(cookies, { bar: { value: '200', options: { path: '/' } } });
  }), assert.fail);
});

test('express, clear cookie', () => {
  store.dispatch(cookie('baz', null, { path: '/' })).then(mustCall(() => {
    assert.deepEqual(cookies, { baz: { options: { path: '/' } } });
  }), assert.fail);
});
