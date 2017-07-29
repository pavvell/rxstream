import Subscription from '../classes/subscription';

/**
 * Subject is a stream of values, that were pushed into it.
 *
 * @example
 * import { Subject } from 'rxstream';
 *
 * let stream$ = new Subject();
 * stream$.subscribe(value => console.log(value));
 * stream$.next(1); // 1
 * stream$.next(2); // 2
 *
 * @class Subject<T>
 */
export class Subject {
  constructor() {

    /**
     * @type {Array}
     * @private
     */
    this._subscriptionList = [];
  }

  subscriptionList(subscriptionList) {
    if (subscriptionList instanceof Array) {
      this._subscriptionList = subscriptionList;
    }

    return this._subscriptionList;
  }

  /**
   * Send value to the stream
   * @param {any} data Any value
   */
  next(data) {
    this.subscriptionList().forEach(subscription => {
      subscription._execute(data);
    });
  }

  /**
   * Subscribe to the stream
   * @param {function} callback
   * @returns {Subscription}
   */
  subscribe(callback) {
    let subscription = new Subscription(this, callback);
    this.subscriptionList().push(subscription);

    return subscription;
  };

  /**
   * Unsubscribe from the stream
   * @param {Subscription} subscription
   */
  unsubscribe(subscription) {
    if(!(subscription instanceof Subscription)) {
      return;
    }

    this.subscriptionList(this.subscriptionList().filter(_subscription => _subscription !== subscription));
  };
}