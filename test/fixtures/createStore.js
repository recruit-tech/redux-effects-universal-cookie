import { createStore, applyMiddleware } from 'redux';
import { default as cookie } from '../../src';

export default function (...args) {
  return createStore(() => {
  }, {}, applyMiddleware(cookie(...args)));
}
