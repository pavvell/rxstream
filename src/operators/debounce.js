export function debounce(SubjectConstructor, stream$, conditionStreamGenerator) {
  let debouncedStream$ = new SubjectConstructor();
  let latestValue = null;
  let latestSubscription;
  let conditionStream$;

  stream$.subscribe((payload) => {
    latestValue = payload;
    (conditionStream$) ? conditionStream$.unsubscribe(latestSubscription) : null;

    conditionStream$ = conditionStreamGenerator();
    latestSubscription = conditionStream$.subscribe(() => {
      debouncedStream$.next(latestValue);
      conditionStream$.unsubscribe(latestSubscription);
    });
  });

  return debouncedStream$;
}