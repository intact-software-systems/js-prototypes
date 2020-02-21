const Optional = require('optional-js')

const {createLoanerWithPromise, createLoanerWithWrappedPromise} = require('./ComputeLoan')

class ComputeLoans {
    #loans

    constructor() {
        this.#loans = new Map()
    }

    computeIfAbsent(key, supplier, isSupplierPromise = true) {
        return Optional.ofNullable(this.#loans.get(key))
            .map(loan => loan.computeIfAbsent())
            .orElseGet(() => {
                const loan = isSupplierPromise ? createLoanerWithPromise(supplier) : createLoanerWithWrappedPromise(supplier)
                this.#loans.set(key, loan)
                return loan.computeIfAbsent()
            })
    }

    read(key) {
        return Optional.ofNullable(this.#loans.get(key))
            .map(loan => loan.getDataLoan())
            .map(dataLoan => dataLoan.isValid() ? dataLoan.read() : undefined)
            .orElse(undefined)
    }

    loanMap() {
        return this.#loans
    }
}

module.exports = {
    ComputeLoans
}