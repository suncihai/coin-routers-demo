export const errorHandler = (error: Error, from?: string) => {
    // eslint-disable-next-line no-console
    console.error(from ? `${from}: error` : error);

    return error;
};
