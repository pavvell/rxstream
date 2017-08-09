import {Subject} from "./src/subjects/subject";
import {debounce} from "./src/operators/debounce";

export { Subject } from './es5/subjects/subject';
export { BehaviorSubject } from './es5/subjects/behaviourSubject';
export { ReplaySubject } from './es5/subjects/replaySubject';

export { merge } from './es5/operators/merge';
export { filter } from './es5/operators/filter';
export { combineLatest } from './es5/operators/combineLatest';
export { debounce } from './es5/operators/debounce';

let clicks$ = new Subject();
let debounced$ = debounce(Subject, clicks$, () => {
  let timer$ = new Subject();

  setInterval(() => {
    timer$.next(1);
    console.log('emit...');
  }, 3000);

  return timer$;
});

document.addEventListener('click', (event) => {
  clicks$.next(new Date());
});

debounced$.subscribe((event) => console.log(event));