import { Subject } from './subject';

/**
 * BehaviorSubject extends Subject. As Subject is a stream of values, BehaviorSubject
 * is also a stream, but a little bit different. The difference is that BehaviorSubject
 * remembers the last value that's been sent to it, and it sends this value to
 * new subscribers. Take a look at example.
 *
 * @example
 * import { BehaviorSubject } from 'rxstream';
 *
 * let stream$ = new BehaviorSubject();
 * stream$.next(1);
 * stream$.next(2);
 *
 * stream$.subscribe(value => console.log(value));
 * stream$.next(3);
 * stream$.next(4);
 *
 * // Output is going ot be: 2,3,4
 *
 * @class BehaviorSubject<T>
 */
export class BehaviorSubject extends Subject {
  constructor() {
    super();
    this._lastCallArgs = null;
  }

  /**
   * Send value to the stream
   * @param {any} data Any value
   */
  next(data) {
    this._lastCallArgs = arguments;
    super.next.apply(this, arguments);
  };

  /**
   * Subscribe to the stream
   * @param {function} callback
   * @returns {Subscription}
   */
  subscribe(callback) {
    if (this._lastCallArgs) {
      callback.apply(this, this._lastCallArgs);
    }

    super.subscribe.apply(this, arguments);
  }
}
