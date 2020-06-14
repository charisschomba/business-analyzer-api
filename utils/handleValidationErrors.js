// creates customized error messages
const validatorErrorHandler = (error) => {
    const [errorDetail] = error.details;

    return ({
        message: errorDetail.message,
        context: errorDetail.context
    })
}

export default validatorErrorHandler;
