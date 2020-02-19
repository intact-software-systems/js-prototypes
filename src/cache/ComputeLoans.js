const Optional = require('optional-js')

const {ComputeLoan, createLoanerWithPromise, createLoanerWithWrappedPromise} = require('./ComputeLoan')

class ComputeLoans {
    #loans

    constructor() {
        this.#loans = new Map()
    }

    computeIfAbsent(key, supplier, isSupplierPromise = true) {
        return Optional.ofNullable(this.#loans.get(key))
            .map(loan => loan.get())
            .orElseGet(() => {
                const loan = isSupplierPromise ? createLoanerWithPromise(supplier) : createLoanerWithWrappedPromise(supplier)
                this.#loans.set(key, loan)
                return loan.get()
            })
    }

    read(key) {
        return Optional.ofNullable(this.#loans.get(key))
            .map(loan => loan.get())
    }

    delete(key) {
        return this.#loans.delete(key)
    }
}

module.exports = {
    ComputeLoans
}