export function merge(SubjectConstructor, subjectList) {
  let stream$ = new SubjectConstructor();

  subjectList.forEach(function (subject) {
    subject.subscribe(payload => stream$.next(payload));
  });

  return stream$;
}