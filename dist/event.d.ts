export declare function createEvent<T>(start: EventPredicate, on: EventPredicate, end: EventPredicate, mapper: EventMapper<Event, T>): import("rxjs").Observable<T>;
export declare const moveEvent: import("rxjs").Observable<Pos>;
