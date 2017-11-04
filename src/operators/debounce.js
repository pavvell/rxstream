/**
 * Debounce delays values emitted by the source stream, and drops previous
 * pending delayed emissions if a new value arrives on source stream.
 *
 * @example
 * import { Subject, debounce } from 'rxstream';
 *
 * let clicks$ = new Subject();
 * let debounced$ = debounce(Subject, clicks$, () => {
 *  let timer$ = new Subject();
 *
 *  setInterval(() => timer$.next(), 1000);
 *
 *  return timer$;
 * });
 *
 * document.addEventListener('click', (event) => {
 *  clicks$.next(new Date());
 * });
 *
 * debounced$.subscribe((event) => console.log(event));
 *
 * @function debounce<T>
 * @param {Subject|BehaviorSubject|ReplaySubject} SubjectConstructor Pass a constructor of result/filtered stream
 * @param {Subject|BehaviorSubject|ReplaySubject} stream$ Stream to be debounced
 * @param {function(value: T): Subject} conditionStreamGenerator a function that should return a stream, when new value arrives on that stream, debounced stream emits latest value from the source stream
 * @returns {Subject|BehaviorSubject|ReplaySubject}
 */
export function debounce(SubjectConstructor, stream$, conditionStreamGenerator) {
  let debouncedStream$ = new SubjectConstructor();
  let latestValue = null;
  let latestSubscription;
  let conditionStream$;

  stream$.subscribe((payload) => {
    latestValue = payload;
    (conditionStream$) ? conditionStream$.unsubscribe(latestSubscription) : null;

    conditionStream$ = conditionStreamGenerator();
    latestSubscription = conditionStream$.subscribe(() => {
      debouncedStream$.next(latestValue);
      conditionStream$.unsubscribe(latestSubscription);
    });
  });

  return debouncedStream$;
}