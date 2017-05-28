import Subject from '../lib/subjects/subject';
import ReplaySubject from '../lib/subjects/replaySubject';
import BehaviorSubject from '../lib/subjects/behaviourSubject';

let clicks$ = new Subject();
let replayClicks$ = new ReplaySubject();
let lastClick$ = new BehaviorSubject();

clicks$.subscribe((click) => {
  console.log('new click arrived...', click);
});

replayClicks$.subscribe((click) => {
  console.log('new replayable click arrived...', click);
});

lastClick$.subscribe((click) => {
  console.log('last click arrived...', click);
});

let index = 0;

let interval = setInterval(() => {
  clicks$.next('click...' + index++);
  replayClicks$.next('click...' + index++);
  lastClick$.next('click...' + index++);
}, 2000);


setTimeout(() => {
  clearInterval(interval);

  replayClicks$.subscribe((clicks) => {
    console.log('replay accumulated clicks...', clicks);
  });

  lastClick$.subscribe((clicks) => {
    console.log('last click...', clicks);
  });
}, 10000);