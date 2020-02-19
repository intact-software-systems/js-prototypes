const {ComputeLoan} = require('../../src/cache/ComputeLoan')

let cnt = 0
let successCnt = 0

function computeError() {
    console.log('Computed error ' + ++cnt)
    throw 'error'
}

function computeSuccess() {
    const cnt = ++successCnt
    console.log('Computed success ' + cnt)

    if (cnt > 1) {
        console.log('This should not happen!!!')
    }
    return 'success ' + cnt
}

const computeRandom = () => Math.random() > 0.49 ? computeSuccess() : computeError()

const loan = new ComputeLoan(computeRandom)


loan.get().then(data => console.log("Success: " + data)).catch(e => console.log("Error: " + e))
loan.get().then(data => console.log("Success: " + data)).catch(e => console.log("Error: " + e))
loan.get().then(data => console.log("Success: " + data)).catch(e => console.log("Error: " + e))
loan.get().then(data => console.log("Success: " + data)).catch(e => console.log("Error: " + e))
loan.get().then(data => console.log("Success: " + data)).catch(e => console.log("Error: " + e))
loan.get().then(data => console.log("Success: " + data)).catch(e => console.log("Error: " + e))
