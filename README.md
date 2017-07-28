# RxStream

If all you need is just a stream (RxJS Subject). Very lightweight and tree-shaking friendly.

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save rxstream
```

## GitHub / Documentation
Not yet

## Example
```javascript
import { Subject } from 'rxstream';

let stream$ = new Subject();
stream$.subscribe(value => console.log(value));
stream$.next(1); // 1
stream$.next(2); // 2
```