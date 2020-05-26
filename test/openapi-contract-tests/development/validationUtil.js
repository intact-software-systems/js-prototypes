const Enforcer = require('openapi-enforcer')

const copy = json => {
    return JSON.parse(JSON.stringify(json))
}

module.exports = {
    dereference: async doc => {
        return Enforcer.dereference(copy(doc))
            .catch(error => {
                console.log(error)
            })
    },
    mock: inputSchema => {
        const [ schema ] = new Enforcer.v3_0.Schema(inputSchema)

        const [ value ] = schema.random()
        console.log(value)

        return value
    }
}