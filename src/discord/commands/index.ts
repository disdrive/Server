import type { command } from '../type';
import { test } from './test';
import { register } from './register';
import { quit } from './quit';

export const commands: command[] = [
  test,
  register,
  quit
];
