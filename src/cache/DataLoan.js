export default class DataLoan {
    constructor(data, loanDurationMsecs) {
        this.data = data
        this.loanDurationMsecs = loanDurationMsecs
        this.loanStart = new Date().getTime()
    }

    static createEmpty() {
        return new DataLoan(undefined, 0)
    }

    static createNewLoan(data, loanDurationMsecs) {
        return new DataLoan(data, loanDurationMsecs)
    }

    refreshLoan(data) {
        this.data = data
        this.loanStart = new Date().getTime()
        return this
    }

    updateData(data) {
        this.data = data
        return this
    }

    getData() {
        return this.data
    }

    isLoanExpired() {
        return this.loanDurationMsecs <= 0 || new Date().getTime() - this.loanStart >= this.loanDurationMsecs
    }
}
