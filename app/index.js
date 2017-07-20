import Subject from '../lib/subjects/subject';
import BehaviorSubject from '../lib/subjects/behaviourSubject';
import merge from '../lib/operators/merge';

let first$ = new Subject();
let second$ = new BehaviorSubject();

second$.next(0);

let merged$ = merge(Subject, [first$, second$]);
let received = [];

second$.subscribe(value => console.log('direct subscribe...', value));

merged$.subscribe(value => {
  received.push(value);
  console.log('received...', value);
});

first$.next(1);
second$.next(2);

console.log('received', received);