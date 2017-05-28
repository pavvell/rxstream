import Subject from './subject';

export default function ReplaySubject() {
  Subject.apply(this, arguments);
  this.calls = [];

  this.next = function(data) {
    this.calls.push(arguments);
    ReplaySubject.prototype.next.apply(this, arguments);
  };

  this.subscribe = function(callback) {
    if (this.calls.length) {
      this.calls.forEach(callArgs => {
        this.next.apply(this, callArgs);
      });
    }

    ReplaySubject.prototype.subscribe.apply(this, arguments);
  }
}

ReplaySubject.prototype = new Subject();