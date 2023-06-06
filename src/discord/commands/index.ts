import type { Command } from '../type';
import { test } from './test';
import { register } from './register';
import { quit } from './quit';

export const commands: Command[] = [
  test,
  register,
  quit
];
