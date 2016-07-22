import { test } from 'eater/runner';
import assert from 'assert';
import { useFakeTimers } from 'sinon';
import mustCall from 'must-call';
import { serialize } from 'cookie';
import { cookie } from '../src';
import createStore from './fixtures/createStore';

useFakeTimers();
global.document = {};
const store = createStore();

test('browser, get cookie', () => {
  global.document.cookie = serialize('foo', '100');
  store.dispatch(cookie('foo')).then(mustCall((result) => {
    assert(result === '100');
  }), assert.fail);
});

test('browser, set cookie', () => {
  store.dispatch(cookie('bar', '200', { path: '/' })).then(mustCall(() => {
    assert(global.document.cookie.toLowerCase() === serialize('bar', '200', { path: '/' }).toLowerCase());
  }), assert.fail);
});

test('browser, clear cookie', () => {
  store.dispatch(cookie('baz', null, { path: '/' })).then(mustCall(() => {
    assert(global.document.cookie.toLowerCase() ===
      serialize('baz', null, { path: '/', expires: new Date(-1) }).toLowerCase());
  }), assert.fail);
});
