function CriteriaNodeEmptyParamatersException(message) {
    this.message = message;
    // Use V8's native method if available, otherwise fallback
    if ("captureStackTrace" in Error) {
        Error.captureStackTrace(this, CriteriaNodeEmptyParamatersException);
    } else {
        this.stack = (new Error()).stack;
    }
}

CriteriaNodeEmptyParamatersException.prototype = Object.create(Error.prototype);
CriteriaNodeEmptyParamatersException.prototype.name = "CriteriaNodeEmptyParamatersException";
CriteriaNodeEmptyParamatersException.prototype.constructor = CriteriaNodeEmptyParamatersException;

export default CriteriaNodeEmptyParamatersException;
