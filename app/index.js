import { Subject } from '../index';
import { filter } from '../index';

let numbers$ = new Subject();

let oddNumbers$ = filter(Subject, numbers$, (click) => {
  return click % 2 === 0;
});

oddNumbers$.subscribe(num => console.log(num));

numbers$.next(1);
numbers$.next(2);
numbers$.next(3);
numbers$.next(4);