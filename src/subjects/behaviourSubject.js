import { Subject } from './subject';

export function BehaviorSubject() {
  Subject.apply(this, arguments);
  let _lastCallArgs = null;

  this.next = function(data) {
    _lastCallArgs = arguments;
    BehaviorSubject.prototype.next.apply(this, arguments);
  };

  this.subscribe = function(callback) {
    if (_lastCallArgs) {
      callback.apply(this, _lastCallArgs);
    }

    BehaviorSubject.prototype.subscribe.apply(this, arguments);
  }
}

BehaviorSubject.prototype = new Subject();