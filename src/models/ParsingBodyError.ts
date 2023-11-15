
export class ParsingBodyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParsingErrorBody";
  }
}