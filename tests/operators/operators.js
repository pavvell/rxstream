import { Subject } from '../../es5/subjects/subject';
import { BehaviorSubject } from '../../es5/subjects/behaviourSubject';
import { ReplaySubject } from '../../es5/subjects/replaySubject';
import { merge } from '../../es5/operators/merge';
import { filter } from '../../es5/operators/filter';
import { combineLatest } from '../../es5/operators/combineLatest';
import { debounce } from '../../es5/operators/debounce';

describe("operators", function() {

  describe("merge", function() {
    it("should merge different streams in one stream of type Subject", function(done) {
      let first$ = new Subject();
      let second$ = new BehaviorSubject();

      second$.next(0);

      let merged$ = merge(Subject, [first$, second$]);

      let received = [];

      merged$.subscribe(value => received.push(value));

      first$.next(1);
      second$.next(2);

      assert.deepEqual(received, [1, 2]);
      done();
    });

    it("should merge different streams in one stream of type BehaviorSubject", function(done) {
      let first$ = new Subject();
      let second$ = new BehaviorSubject();
      let third$ = new BehaviorSubject();

      first$.next(1);
      second$.next(2);
      third$.next(3);

      let merged$ = merge(BehaviorSubject, [first$, second$, third$]);

      let received = [];

      merged$.subscribe(value => received.push(value));

      first$.next(4);
      second$.next(5);
      third$.next(6);

      assert.deepEqual(received, [3, 4, 5, 6]);
      done();
    });

    it("should merge different streams in one stream of type ReplaySubject", function(done) {
      let first$ = new Subject();
      let second$ = new BehaviorSubject();
      let third$ = new ReplaySubject();

      first$.next(1);
      second$.next(2);
      second$.next(3);
      third$.next(4);
      third$.next(5);

      let merged$ = merge(ReplaySubject, [first$, second$, third$]);

      let received = [];

      merged$.subscribe(value => received.push(value));

      first$.next(6);
      second$.next(7);
      third$.next(8);
      third$.next(9);

      assert.deepEqual(received, [3, 4, 5, 6, 7, 8, 9]);
      done();
    });
  });

  describe("filter", function() {
    it("should filter given stream", function(done) {
      let numbers$ = new Subject();
      let received = [];

      let evenNumbers$ = filter(Subject, numbers$, (click) => {
        return click % 2 === 0;
      });

      evenNumbers$.subscribe(num => received.push(num));

      numbers$.next(1);
      numbers$.next(2);
      numbers$.next(3);
      numbers$.next(4);

      assert.deepEqual(received, [2, 4]);
      done();
    });

    it("should filter given stream of BehaviorSubject", function(done) {
      let numbers$ = new BehaviorSubject();
      let received = [];

      numbers$.next(1);
      numbers$.next(2);

      let evenNumbers$ = filter(BehaviorSubject, numbers$, (click) => {
        return click % 2 === 0;
      });

      evenNumbers$.subscribe(num => received.push(num));

      numbers$.next(3);
      numbers$.next(4);

      assert.deepEqual(received, [2, 4]);
      done();
    });

    it("should filter given stream of ReplaySubject", function(done) {
      let numbers$ = new ReplaySubject();
      let received = [];

      numbers$.next(1);
      numbers$.next(2);
      numbers$.next(3);
      numbers$.next(4);

      let oddNumbers$ = filter(ReplaySubject, numbers$, (click) => {
        return click % 2 === 1;
      });

      oddNumbers$.subscribe(num => received.push(num));

      numbers$.next(5);
      numbers$.next(6);

      assert.deepEqual(received, [1, 3, 5]);
      done();
    });

  });

  describe("combineLatest", function() {
    it("should combine latest values of mixed streams", function(done) {
      let letters$ = new Subject();
      let numbers$ = new Subject();
      let received = [];

      let latest$ = combineLatest(Subject, [letters$, numbers$]);
      latest$.subscribe(value => received.push(value));

      letters$.next('a');
      numbers$.next(1);
      letters$.next('b');
      numbers$.next(2);
      numbers$.next(3);
      numbers$.next(4);
      letters$.next('c');
      letters$.next('d');
      letters$.next('e');

      assert.deepEqual(received[0], ['a', 1]);
      assert.deepEqual(received[1], ['b', 1]);
      assert.deepEqual(received[2], ['b', 2]);
      assert.deepEqual(received[3], ['b', 3]);
      assert.deepEqual(received[4], ['b', 4]);
      assert.deepEqual(received[5], ['c', 4]);
      assert.deepEqual(received[6], ['d', 4]);
      assert.deepEqual(received[7], ['e', 4]);
      done();
    });

    it("should not emit values if some streams not yet received any value", function(done) {
      let letters$ = new Subject();
      let numbers$ = new Subject();
      let received = [];

      let latest$ = combineLatest(Subject, [letters$, numbers$]);
      latest$.subscribe(value => received.push(value));

      letters$.next('a');
      assert.deepEqual(received, []);

      numbers$.next(1);
      assert.deepEqual(received[0], ['a', 1]);
      done();
    });
  });

  describe("debounce", function() {
    it("debounced stream should emit the latest values of the source stream when new value arrives on condition stream", function(done) {
      let clicks$ = new Subject();
      let condition$ = new Subject();
      let received = [];

      let debounced$ = debounce(Subject, clicks$, () => condition$);
      debounced$.subscribe(value => received.push(value));

      clicks$.next(1);
      clicks$.next(2);
      clicks$.next(3);
      clicks$.next(4);
      condition$.next('a');
      clicks$.next(5);

      assert.equal(received[0], 4);
      done();
    });
  });
});