/**
 * Subscription is returned when you subscribe on stream.
 * @experimental
 * @class Subscription<T>
 */
export default class Subscription {
  constructor(parentSubject, callback) {
    this._callback = callback;
    this._isStopped = false;
  }

  /**
   * @private
   */
  _execute(data) {
    if (this._isStopped) {
      return;
    }

    this._callback(data);
  };

  /**
   * Unsubscribe from the stream
   */
  unsubscribe() {
    this._isStopped = true;
  }
}