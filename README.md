# RxStream

If all you need is just a stream (RxJS Subject). Very lightweight (1.5Kb gzipped) and tree-shaking friendly.

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save rxstream
```

## Documentation
[Documentation](https://rxstream.herokuapp.com/)

## Example
```javascript
import { Subject } from 'rxstream';

let stream$ = new Subject();
stream$.subscribe(value => console.log(value));
stream$.next(1); // 1
stream$.next(2); // 2
```
## Tree-shaking
To perform better tree-shaking, import what you need from its local module, for example:
```javascript
import { Subject } from 'rxstream/es5/subjects/subject';
import { merge } from 'rxstream/es5/operators/merge';
```