import Subject from '../../lib/subjects/subject';
import merge from '../../lib/operators/merge';

describe("operators", function() {

  describe("merge", function() {
    it("should merge Subjects in one stream", function(done) {
      let first$ = new Subject();
      let second$ = new Subject();
      let merged$ = merge(Subject, [first$, second$]);

      let received = [];

      merged$.subscribe(value => received.push(value));

      first$.next(1);
      second$.next(2);

      assert.deepEqual(received, [1, 2]);
      done();
    });
  });

});