import { Subject } from './subject';

/**
 * ReplaySubject extends Subject. As Subject is a stream of values, ReplaySubject
 * is also a stream, but a little bit different. The difference is that ReplaySubject
 * remembers all values that's been sent to it, and it sends all these values to
 * new subscribers. Take a look at example.
 *
 * @example
 * import { ReplaySubject } from 'rxstream';
 *
 * let stream$ = new ReplaySubject();
 * stream$.next(1);
 * stream$.next(2);
 *
 * stream$.subscribe(value => console.log(value));
 * stream$.next(3);
 * stream$.next(4);
 *
 * // Output is going ot be: 1,2,3,4
 *
 * @class ReplaySubject<T>
 */
export class ReplaySubject extends Subject {

  constructor() {
    super();
    this.calls = [];
  }

  /**
   * Send value to the stream
   * @param {any} data Any value
   */
  next(data) {
    this.calls.push(arguments);
    super.next.apply(this, arguments);
  };

  /**
   * Subscribe to the stream
   * @param {function} callback
   * @returns {Subscription}
   */
  subscribe(callback) {
    if (this.calls.length) {
      this.calls.forEach(callArgs => {
        callback.apply(this, callArgs);
      });
    }

    super.subscribe.apply(this, arguments);
  }
}