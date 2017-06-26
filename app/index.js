import Subject from '../lib/subjects/subject';
import ReplaySubject from '../lib/subjects/replaySubject';
import BehaviorSubject from '../lib/subjects/behaviourSubject';

let replayClicks$ = new ReplaySubject();

replayClicks$.subscribe((click) => {
  console.log('new replayable click arrived...', click);
});

replayClicks$.next('one');
replayClicks$.next('two');

setTimeout(() => {
  replayClicks$.subscribe((clicks) => {
    console.log('replay accumulated clicks...', clicks);
  });
}, 2000);