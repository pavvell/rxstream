export function debounce(SubjectConstructor, stream$, conditionStreamGenerator) {
  let debouncedStream$ = new SubjectConstructor();
  let latestValue = null;
  let latestSubscription;

  stream$.subscribe((payload) => {
    console.log('subscribe...');
    latestValue = payload;
    (latestSubscription) ? latestSubscription.unsubscribe() : null;

    let conditionStream$ = conditionStreamGenerator();
    latestSubscription = conditionStream$.subscribe(() => {
      debouncedStream$.next(latestValue);
      latestSubscription.unsubscribe();
    });
  });

  return debouncedStream$;
}