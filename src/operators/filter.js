export function filter(SubjectConstructor, stream$, conditionCallback) {
  let filteredStream$ = new SubjectConstructor();

  stream$.subscribe(function (payload) {
    (conditionCallback(payload)) ? filteredStream$.next(payload) : null
  });

  return filteredStream$;
}