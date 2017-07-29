/**
 * Merges two or more streams into one.
 *
 * @example
 * import { Subject, BehaviorSubject, merge } from 'rxstream';
 *
 * let first$ = new BehaviorSubject();
 * let second$ = new Subject();
 * let merged$ = merge(Subject, [first$, second$])
 *
 * first$.next(1);
 *
 * merged$.subscribe(value => console.log(value));
 * first$.next(2);
 * second$.next(3);
 * second$.next(4);
 *
 * // Output is going to be: 2, 3, 4.
 * // Notice that despite the fact that merged stream has BehaviorSubject
 * // we are getting in output only 2, 3 and 4 but not 1. This is because we specified
 * // that our result stream should be of type Subject, which does not remember
 * // previous values.
 *
 * @function merge<T>
 * @param {Subject|BehaviorSubject|ReplaySubject} SubjectConstructor Pass a constructor of result/merged stream
 * @param {Array} subjectList An array of subjects/streams to be merged
 * @returns {Subject|BehaviorSubject|ReplaySubject}
 */
export function merge(SubjectConstructor, subjectList) {
  let stream$ = new SubjectConstructor();

  subjectList.forEach(function (subject) {
    subject.subscribe(payload => stream$.next(payload));
  });

  return stream$;
}