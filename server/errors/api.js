function APIError(status, message) {
  this.name = "ApiError";
  this.message = message;
  this.stack = new Error().stack;
  this.status = status;
}

APIError.prototype = new Error();
APIError.prototype.constructor = APIError;

module.exports = APIError;
