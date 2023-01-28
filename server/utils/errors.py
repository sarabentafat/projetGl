class InvalidParamsError(ValueError):
    def __init__(self, message):
        self.message = message or 'Invalide params for this request'
        super().__init__(self.message)
