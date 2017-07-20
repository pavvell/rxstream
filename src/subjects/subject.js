import Subscription from '../classes/subscription';

export function Subject() {
  let _subscriptionList = [];

  this.subscriptionList = function(subscriptionList) {
    if (subscriptionList instanceof Array) {
      _subscriptionList = subscriptionList;
    }

    return _subscriptionList;
  }
}

Subject.prototype.next = function(data) {
  this.subscriptionList().forEach(subscription => {
    subscription.execute(data);
  });
};

Subject.prototype.subscribe = function(callback) {
  var subscription = new Subscription(this, callback);
  this.subscriptionList().push(subscription);

  return subscription;
};

Subscription.prototype.unsubscribe = function(subscription) {
  if(!(subscription instanceof Subscription)) {
    return;
  }

  this.subscriptionList(this.subscriptionList().filter(_subscription => _subscription !== subscription));
};