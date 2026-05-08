import type { Lesson, LessonChapter } from '../types';
import { tsTypes } from './ts-01-types';
import { tsArrayObject } from './ts-02-array-object';
import { tsFunctions } from './ts-03-functions';
import { tsInterfaces } from './ts-04-interfaces';
import { reactComponent } from './react-01-component';
import { reactProps } from './react-02-props';
import { reactState } from './react-03-state';
import { reactEventsList } from './react-04-events-list';
import { rtTypedProps } from './rt-01-typed-props';
import { rtTypedState } from './rt-02-typed-state';
import { rtEventsEffects } from './rt-03-events-effects';

export const LESSONS: Lesson[] = [
  tsTypes,
  tsArrayObject,
  tsFunctions,
  tsInterfaces,
  reactComponent,
  reactProps,
  reactState,
  reactEventsList,
  rtTypedProps,
  rtTypedState,
  rtEventsEffects,
];

export const getLessonById = (id: string): Lesson | undefined =>
  LESSONS.find((l) => l.id === id);

export const getLessonsByChapter = (chapter: LessonChapter): Lesson[] =>
  LESSONS.filter((l) => l.chapter === chapter).sort((a, b) => a.order - b.order);

export const getNextLesson = (id: string): Lesson | undefined => {
  const idx = LESSONS.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  return LESSONS[idx + 1];
};

export const getPreviousLesson = (id: string): Lesson | undefined => {
  const idx = LESSONS.findIndex((l) => l.id === id);
  if (idx <= 0) return undefined;
  return LESSONS[idx - 1];
};

export { CHAPTERS } from './chapters';
