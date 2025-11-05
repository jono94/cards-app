class DomainException(Exception):
    pass


class NotExistsException(DomainException):
    pass


class AlreadyExistsException(DomainException):
    pass


class InvalidDataException(DomainException):
    pass
