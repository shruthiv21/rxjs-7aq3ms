import './style.css';

import { of, map, Observable } from 'rxjs';

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.

enum TaskType {
  STARTING,
  START,
  PROGRESS,
  COMPLETE,
}

interface TaskEvent {
  type: TaskType;
  timestamp: number;
}

interface TaskStarting extends TaskEvent {
  type: TaskType.STARTING;
}
interface TaskStart extends TaskEvent {
  type: TaskType.START;
}

interface TaskProgress<TProgress> extends TaskEvent {
  type: TaskType.PROGRESS;
  data: TProgress;
}

interface TaskComplete<TResult> extends TaskEvent {
  type: TaskType.COMPLETE;
  data: TResult;
}

type TaskUpdate<TResult, TProgress = unknown> =
  | TaskStarting
  | TaskStart
  | TaskProgress<TProgress>
  | TaskComplete<TResult>;

type TaskStream<TResult, TProgress = unknown> = Observable<
  TaskUpdate<TResult, TProgress>
>;
