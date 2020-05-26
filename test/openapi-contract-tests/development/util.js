module.exports = {
    copy: json => {
        return JSON.parse(JSON.stringify(json))
    },
    logger: () => {
        return ({error, warning}) => {

            if (!error) {
                console.log('No errors with your document')

                if (warning) {
                    console.warn(warning)
                }
            }
            else {
                console.error(error)
            }
        }
    }
}