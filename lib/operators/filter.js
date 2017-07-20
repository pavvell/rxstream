export function filter(SubjectConstructor, stream$, conditionCallback) {
  var filteredStream$ = new SubjectConstructor();

  stream$.subscribe(payload =>
    (conditionCallback(payload)) ? filteredStream$.next(payload) : null);

  return filteredStream$;
}