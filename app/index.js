import Subject from '../lib/subjects/subject';
import merge from '../lib/operators/merge';

let first$ = new Subject();
let second$ = new Subject();
let merged$ = merge(Subject, [first$, second$]);

let received = [];

merged$.subscribe(value => received.push(value));

first$.next(1);
second$.next(2);

console.log('received', received);