import { createStore, applyMiddleware } from 'redux';
import cookieMiddleware from '../../src';

export default function (...args) {
  return createStore(() => {
  }, {}, applyMiddleware(cookieMiddleware(...args)));
}
