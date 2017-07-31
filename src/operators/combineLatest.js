/**
 * Combines latest values of two or more streams, and returns new stream of an array filled with
 * these values. It will start emit latest values only when all streams has received at least one
 * value.
 *
 * @example
 * import { Subject, combineLatest } from 'rxstream';
 *
 * let letters$ = new Subject();
 * let numbers$ = new Subject();
 * let latest$ = combineLatest(Subject, [letters$, numbers$]);
 *
 * latest$.subscribe(latest => console.log(latest));
 *
 * letters$.next('a'); // no output, as numbers$ not yet received any value
 * numbers$.next(1);   // ['a', 1]
 * letters$.next('b'); // ['b', 1]
 * numbers$.next(2);   // ['b', 2]
 * numbers$.next(3);   // ['b', 3]
 * numbers$.next(4);   // ['b', 4]
 * letters$.next('c'); // ['c', 4]
 * letters$.next('d'); // ['d', 4]
 *
 * @function combineLatest<T>
 * @param {Subject|BehaviorSubject|ReplaySubject} SubjectConstructor Pass a constructor of result stream of an array with latest values
 * @param {Array} subjectList An array of subjects/streams latest values of which needs to be collected
 * @returns {Subject|BehaviorSubject|ReplaySubject}
 */
export function combineLatest(SubjectConstructor, subjectList) {
  let resultStream$ = new SubjectConstructor();
  let latestValues = [];
  let initiated = new Array(subjectList.length).fill(false);

  function onValueArrived() {
    let allSubjectsSentValuesAtLeastOnce = initiated.every(flag => flag === true);

    if (!allSubjectsSentValuesAtLeastOnce) {
      return;
    }

    resultStream$.next([].concat(latestValues));
  }

  subjectList.forEach(function (subject, index) {
    subject.subscribe(payload => {
      initiated[index] = true;
      latestValues[index] = payload;
      onValueArrived();
    });
  });

  return resultStream$;
}