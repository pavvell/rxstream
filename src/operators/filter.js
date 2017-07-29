/**
 * Filters one stream and returns another with only filtered values.
 *
 * @example
 * import { Subject, filter } from 'rxstream';
 *
 * let numbers$ = new Subject();
 * let evenNumbers$ = filter(Subject, numbers$, (num) => num % 2 === 0);
 *
 * evenNumbers$.subscribe(num => console.log(num));
 *
 * numbers$.next(1);
 * numbers$.next(2);
 * numbers$.next(3);
 * numbers$.next(4);
 *
 * // Output is going to be: 2, 4
 *
 * @function filter<T>
 * @param {Subject|BehaviorSubject|ReplaySubject} SubjectConstructor Pass a constructor of result/filtered stream
 * @param {Subject|BehaviorSubject|ReplaySubject} stream$ Stream to be filtered
 * @param {function(value: T): boolean} conditionCallback Predicate function, to test each element of the stream. Return true to keep the element, false otherwise
 * @returns {Subject|BehaviorSubject|ReplaySubject}
 */
export function filter(SubjectConstructor, stream$, conditionCallback) {
  let filteredStream$ = new SubjectConstructor();

  stream$.subscribe(function (payload) {
    (conditionCallback(payload)) ? filteredStream$.next(payload) : null
  });

  return filteredStream$;
}