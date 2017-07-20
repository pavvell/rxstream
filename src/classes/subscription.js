export default function Subscription (parentSubject, callback) {
  var _callback = callback;
  var _isStopped = false;

  this.execute = function(data) {
    if (_isStopped) {
      return;
    }

    _callback(data);
  };

  this.unsubscribe = function() {
    _isStopped = true;
  }
}