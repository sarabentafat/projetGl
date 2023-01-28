from functools import wraps
from flask import jsonify
def error_handler() -> object:
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            try:
                return f(*args, **kwargs)
            # handle different types of errors and return messages accordingly with status code
            except Exception as e:
                if isinstance(e, ValueError):
                    return jsonify({'message': e.args[0], 'type': 'ValueError'}), 400
                elif isinstance(e, AttributeError):
                    return jsonify({'message': e.args[0], 'type': 'AttributeError'}), 400
                elif isinstance(e, KeyError):
                    return jsonify({'message': e.args[0], 'type': 'KeyError'}), 400
                elif isinstance(e, TypeError):
                    return jsonify({'message': e.args[0], 'type': 'TypeError'}), 400
                else:
                    return jsonify({'message': str(e), 'type': 'InternalServerError'}), 500
        return wrapped
    return wrapper