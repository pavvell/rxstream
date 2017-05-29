import Subject from '../../lib/subjects/subject';

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