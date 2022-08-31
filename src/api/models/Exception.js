class Exception {
  error = true;
  statusCode;
  description;
  message;

  constructor(statusCode, description, message) {
    this.statusCode = statusCode;
    this.description = description;
    this.message = message;
  }
}

module.exports = Exception;