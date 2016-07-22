import { test } from 'eater/runner';
import assert from 'assert';
import { useFakeTimers } from 'sinon';
import mustCall from 'must-call';
import { cookie } from '../src';
import createStore from './fixtures/createStore';

useFakeTimers();

const cookies = {};
const mockCookies = {
  get(name) {
    return cookies[name];
  },
  set(name, value, options = {}) {
    value || (options.expires = new Date(0));
    cookies[name] = { value, options };
  },
};
const store = createStore(mockCookies);

test('koa, get cookie', () => {
  cookies.foo = '100';
  store.dispatch(cookie('foo')).then(mustCall((result) => {
    assert(result === '100');
  }), assert.fail);
});

test('koa, set cookie', () => {
  store.dispatch(cookie('bar', '200', { path: '/' })).then(mustCall(() => {
    assert.deepEqual(cookies, { bar: { value: '200', options: { path: '/' } } });
  }), assert.fail);
});

test('koa, clear cookie', () => {
  store.dispatch(cookie('baz', null, { path: '/' })).then(mustCall(() => {
    assert.deepEqual(cookies, { baz: { value: null, options: { path: '/', expires: new Date(0) } } });
  }), assert.fail);
});
