import { Subject } from '../../lib/subjects/subject';
import { BehaviorSubject } from '../../lib/subjects/behaviourSubject';
import { ReplaySubject } from '../../lib/subjects/replaySubject';
import { merge } from '../../lib/operators/merge';

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

});