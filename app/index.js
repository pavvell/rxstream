import Subject from '../lib/subjects/subject';
import ReplaySubject from '../lib/subjects/replaySubject';
import BehaviorSubject from '../lib/subjects/behaviourSubject';

let replayClicks$ = new Subject();

var subscription = replayClicks$.subscribe((click) => {
  console.log('new replayable click arrived...', click);
});

replayClicks$.next('one');
replayClicks$.next('two');

console.log('subscription...', subscription);

/*
var i = 10;
setInterval(() => {
  replayClicks$.next(i++);
  subscription.unsubscribe();
}, 1000);
*/
