const requests = require('../test-data/requests.json')

function isCompatible(required, returned) {
    if (Array.isArray(required)) {
        console.log('Arrays matched? ' + Array.isArray(returned))
        return Array.isArray(returned)
    }

    // console.log("IsCompatible? " + JSON.stringify(copy) + " " + JSON.stringify(master))
    console.log('IsCompatible? ' + Object.keys(required) + ' ' + Object.keys(returned))

    const ret = Object.keys(required)
        .map(key => {
            if (returned.hasOwnProperty(key)) {
                console.log('Property present ' + key)
                return true
            }
            console.log('Property NOT present ' + key)
            return false
        })

    const find = ret.find(a => a === false) //?
    return find === undefined
}

function compareJsons(required, returned) {
    if (!isCompatible(required, returned)) {
        return false
    }

    if (Array.isArray(required)) {
        for (const requiredValue of required) //?
        {
            for (const key of Object.keys(requiredValue)) //?
            {
                for (const returnedValue of returned) {
                    const hasProperty = requiredValue[key] instanceof Object || Array.isArray(requiredValue[key]) //?
                    if (hasProperty && requiredValue[key] && returnedValue[key]) //?
                    {
                        const compatible = compareJsons(requiredValue[key], returnedValue[key])
                        if (!compatible) {
                            console.log('Not compatible ' + key)
                            console.log(requiredValue[key])
                            console.log(returnedValue[key])
                            return false
                        }
                    }
                    else if (!returnedValue.hasOwnProperty(key)) {
                        console.log('Not compatible ' + key)
                        console.log(requiredValue)
                        console.log(returnedValue)
                        return false
                    }
                }
            }
        }
    }
    else {
        for (const key of Object.keys(required)) {
            const hasProperty = required[key] instanceof Object || Array.isArray(required[key])

            if (hasProperty && required[key] && returned[key]) //?
            {
                const compatible = compareJsons(required[key], returned[key])
                if (!compatible) {
                    console.log('Not compatible ' + key)
                    console.log(required[key])
                    console.log(returned[key])
                    return false
                }
            }
            else if (!returned.hasOwnProperty(key)) {
                console.log('Not compatible ' + key)
                console.log(required)
                console.log(returned)
                return false
            }
        }
    }

    console.log('Returning no return')
    return true
}

module.exports = {
    compareGetAccounts: returned => compareJsons(requests.requests['/account'].GET.response, returned),
    compareGetOneAccount: returned => compareJsons(requests.requests['/account/NO36240000108'].GET.response, returned)
}