class BadRequest extends Error {
  constructor(message, stack) {
    super(message, stack);
    this.status = 400;
  }
}

class ServerError extends Error {
  constructor() {
    this.status = 500;
    this.message = "Server Error";
  }
}

module.exports = { BadRequest, ServerError };
