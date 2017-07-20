export default function merge(SubjectConstructor, subjectList) {
  var stream$ = new SubjectConstructor();

  subjectList.forEach(function (subject) {
    subject.subscribe(payload => stream$.next(payload));
  });

  return stream$;
}