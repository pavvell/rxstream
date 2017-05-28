export default function Subject() {
  var callbacks = [];

  this.callbacks = function() {
    return callbacks;
  }
}

Subject.prototype.next = function(data) {
  this.callbacks().forEach(callback => {
    callback(data);
  });
};

Subject.prototype.subscribe = function(callback) {
  this.callbacks().push(callback);
};