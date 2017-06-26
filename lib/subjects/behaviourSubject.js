import Subject from './subject';

export default function BehaviorSubject() {
  Subject.apply(this, arguments);
  var _lastCallArgs = null;

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