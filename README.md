![Documentation](https://doc.esdoc.org/github.com/pavvell/rxstream/badge.svg)

# RxStream

If all you need is just a stream (RxJS Subject). Very lightweight (1.5Kb gzipped) and tree-shaking friendly.

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save rxstream
```

## GitHub / Documentation
[Documentation](https://doc.esdoc.org/github.com/pavvell/rxstream/)

[GitHub](https://github.com/pavvell/rxstream)

## Example
```javascript
import { Subject } from 'rxstream';

let stream$ = new Subject();
stream$.subscribe(value => console.log(value));
stream$.next(1); // 1
stream$.next(2); // 2
```