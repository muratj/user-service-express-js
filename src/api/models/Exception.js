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

class BadRequestException extends Exception {
  constructor(message) {
    super(400, 'Bad Request', message);
  }
}

class UnauthorizedException extends Exception {
  constructor(message) {
    super(401, 'Unauthorized', message);
  }
}

class ForbiddenException extends Exception {
  constructor(message) {
    super(403, 'Forbidden', message);
  }
}

class NotFoundException extends Exception {
  constructor(message) {
    super(404, 'Not Found', message);
  }
}

module.exports = { BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException };