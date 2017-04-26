/*
 * A part of these functions are:
 *   Copyright Weo.io <info@weo.io>
 *   Released under the MIT license.
 *   https://github.com/redux-effects/redux-effects-cookie/blob/master/src/index.js
 */

import componentCookie from 'component-cookie';

/*
 * Action types
 */
const GET_COOKIE = 'EFFECT_GET_COOKIE';
const SET_COOKIE = 'EFFECT_SET_COOKIE';

/*
 * Action creators
 */
export function cookie(name, value, options = {}) {
  return arguments.length < 2
    ? { type: GET_COOKIE, payload: { name } }
    : { type: SET_COOKIE, payload: { name, value, options } };
}

/*
 * Middleware
 */
export default function cookieMiddleware(...args) {
  const cookiesFactories = [
    browserCookies,
    (cookies) => cookies, // https://www.npmjs.com/package/cookies
    expressCookies,
  ];
  const cookiesFactory = cookiesFactories[Math.min(args.length, 2)];
  const cookies = cookiesFactory(...args);

  return () => (next) => (action) => {
    const { type } = action;
    if (type !== GET_COOKIE && type !== SET_COOKIE) {
      return next(action);
    }

    const { name, value, options } = action.payload;
    return type === GET_COOKIE
      ? Promise.resolve(cookies.get(name))
      : Promise.resolve(cookies.set(name, value, options));
  };
}

function browserCookies() {
  return {
    get(name) {
      return componentCookie(name);
    },
    set(name, value, options) {
      return componentCookie(name, value, options);
    },
  };
}

function expressCookies(req, res) {
  return {
    get(name) {
      return req.cookies[name];
    },
    set(name, value, options) {
      return value != null
        ? res.cookie(name, value, options)
        : res.clearCookie(name, options);
    },
  };
}
