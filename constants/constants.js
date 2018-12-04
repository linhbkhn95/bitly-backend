module.exports = {
    response: {
        ok: {
            code: 0,
            message: 'OK',
            data: null,
        },
        error: {
            code: 1,
            message: 'System Error',
            data: null,
        },
        unValidToken: {
            code: 2,
            message: 'Token is not validate',
            data: null,
        },
        unValidLink: {
            code: 3,
            message: 'Link is not validate',
            data: null,
        }
    },
    statusCode: {
        ok: 200,
        notFound: 404,
        systemError: 505,
    },
};
