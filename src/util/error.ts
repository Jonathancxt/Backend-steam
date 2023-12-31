export function ResponseError(status: number, message: string) {
    this.name = 'ResponseError';
    this.message = message || 'Internal Server Error 500';
    let error = new Error(this.message);
    error.name = this.name;
    this.stack = error.stack;
    this.status = status || 500;
}
ResponseError.prototype = Object.create(Error.prototype);

module.exports = {ResponseError};
