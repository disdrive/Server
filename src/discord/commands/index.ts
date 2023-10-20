import type { Command } from "@/types/discord";
import { ping } from "./ping";
import { register } from "./register";
import { quit } from "./quit";

export const commands: Command[] = [ping, register, quit];
