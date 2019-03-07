# Deprecated.

this modules are not maintained. And cookies should not be used in client.
see [ITP 2.1](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/)

# redux-effects-universal-cookie

Universal version of
[redux-effects-cookie](https://github.com/redux-effects/redux-effects-cookie).

## Installation

```
npm install --save redux-effects-universal-cookie
```

## Usage

### Installing the middleware

for Browsers:

```javascript
import { createStore, applyMiddleware } from 'redux';
import cookieMiddleware from 'redux-effects-universal-cookie';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
    cookieMiddleware() // no args
  )
);
```

for Express:

```javascript
import { createStore, applyMiddleware } from 'redux';
import cookieMiddleware from 'redux-effects-universal-cookie';
import rootReducer from './reducers';

app.get('/', function(req, res){
  const store = createStore(
    rootReducer,
    applyMiddleware(
      cookieMiddleware(req, res)
    )
  );
});
```

for
[Koa](https://www.npmjs.com/package/koa)
(via
[cookies](https://www.npmjs.com/package/cookies)
):

```javascript
import { createStore, applyMiddleware } from 'redux';
import cookieMiddleware from 'redux-effects-universal-cookie';
import rootReducer from './reducers';

app.use(function *(){
  const store = createStore(
    rootReducer,
    applyMiddleware(
      cookieMiddleware(this.cookies)
    )
  );
});
```

### Using Actions:

getting cookie:

```javascript
import { cookie } from 'redux-effects-universal-cookie';

const promise = store.dispatch(cookie('foo'));
```

setting cookie:

```javascript
import { cookie } from 'redux-effects-universal-cookie';

const promise = store.dispatch(cookie('foo', 'some value'));
```

setting cookie with options:

```javascript
import { cookie } from 'redux-effects-universal-cookie';

const promise = store.dispatch(cookie('foo', 'some value', { maxAge: 600 }));
```

## Defferences from redux-effects-cookie

On the server-side,
[redux-effects-cookie](https://github.com/redux-effects/redux-effects-cookie)
does not reflect the setting to a cookie for a response (i.e. `Set-Cookie` headers.).

On the other hand, redux-effects-universal-cookie sets `Set-Cookie` headers properly.

## API

### Action Creators

#### `cookie(name, [value], [options])`

###### Arguments

* `name` *(String)*: The name of cookie.
* `value` *(Any)*: If omitted, returns the cookie value.
    Otherwise, sets the cookie value.
    Passing `null` as value deletes the cookie.
* `options` *(Object)*: Please see below links for more options:
        * [Browser](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
        * [Express](http://expressjs.com/en/4x/api.html#res.cookie)
        * [Koa (cookies)](https://www.npmjs.com/package/cookie#options-1)

##### Returns

* *(Object)*: An action object.

### Middleware

#### `cookieMiddleware()`

Create Redux middleware for browser environment.

##### Returns

* *(Function)*: Redux middleware.

#### `cookieMiddleware(cookies)`

Create Redux middleware for Koa environment.

##### Arguments

* `cookies` *(Object)*: The
  [cookies](https://www.npmjs.com/package/cookies)
  object.

##### Returns

* *(Function)*: Redux middleware.

#### `cookieMiddleware(req, res)`

Create Redux middleware for Express environment.

##### Arguments

* `req` *(Object)*: The
  [request](http://expressjs.com/en/4x/api.html#req)
  object.
* `res` *(Object)*: The
  [response](http://expressjs.com/en/4x/api.html#res)
  object.

##### Returns

* *(Function)*: Redux middleware.
