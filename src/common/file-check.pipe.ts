import { Reflector } from "@nestjs/core";

export const StreamFile = Reflector.createDecorator<string[]>();
