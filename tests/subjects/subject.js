import Subject from '../../lib/subjects/subject';
import ReplaySubject from '../../lib/subjects/replaySubject';
import BehaviorSubject from '../../lib/subjects/behaviourSubject';

describe("Subjects", function() {

  describe("Subject", function() {
    it("subscribe() receives values that's been sent", function(done) {
      let clicks$ = new Subject();
      let received = [];
      let send = [1,2, {name: 'Lisa'}];

      clicks$.subscribe((click) => {
        received.push(click);

        if (received.length === send.length) {
          assert.deepEqual(send, received);
          done();
        }
      });

      send.forEach(item => clicks$.next(item));
    });
  });

  describe("ReplaySubject", function() {
    it("new subscribers receive all values that's been sent before", function(done) {
      console.log('run...');
      let replayClicks$ = new ReplaySubject();
      let send = [1,2, {name: 'Lisa'}];
      let received = [];

      send.forEach(item => replayClicks$.next(item));

      replayClicks$.subscribe((item) => {
        console.log(item);
        received.push(item);

        if (received.length === send.length) {
          assert.deepEqual(send, received);
          done();
        }
      });
    });
  });

  describe("BehaviourSubject", function() {
    it("new subscribers receive last value that's been sent before", function(done) {
      let lastClick$ = new BehaviorSubject();
      let send = [1,2, {name: 'Lisa'}];

      send.forEach(item => lastClick$.next(item));

      lastClick$.subscribe((item) => {
        assert.equal(item, send.pop());
        done();
      });
    });
  });
});