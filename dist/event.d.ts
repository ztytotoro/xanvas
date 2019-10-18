import { Observable } from 'rxjs';
export declare const EventStart: unique symbol;
export declare const EventEnd: unique symbol;
export declare function createEvent<T = Event>(start: EventPredicate, on: EventPredicate, end: EventPredicate, mapper?: EventMapper<Event, T>): Observable<[typeof EventStart, T] | [T, typeof EventEnd]>;
export declare const moveEvent: Observable<[typeof EventStart, Pos] | [Pos, typeof EventEnd]>;
