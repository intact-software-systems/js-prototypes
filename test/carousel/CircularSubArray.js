module.exports = class CircularSubArray {
    constructor(array, subArrayLength, subArrayStartIndex) {
        this.props = {
            array: array,
            subArrayLength: subArrayLength
        }

        this.subArrayStartIndex = subArrayStartIndex
    }

    currentCompute() {
        let channelIndex = this.subArrayStartIndex
        let array = []
        for (let i = 0; i < this.props.subArrayLength; i++) {
            array.push(this.props.array[channelIndex])
            channelIndex = (channelIndex + 1) % this.props.array.length
        }
        return array
    }

    left(moveLength) {
        this.subArrayStartIndex = Math.abs(((this.subArrayStartIndex - moveLength) + this.props.array.length) % this.props.array.length)
        return this.subArrayStartIndex
    }

    right(moveLength) {
        this.subArrayStartIndex = Math.abs((this.subArrayStartIndex + moveLength) % this.props.array.length)
        return this.subArrayStartIndex
    }

    leftCompute(moveLength = this.props.subArrayLength) {
        this.subArrayStartIndex = Math.abs(((this.subArrayStartIndex - moveLength) + this.props.array.length) % this.props.array.length)
        return this.currentCompute()
    }

    rightCompute(moveLength = this.props.subArrayLength) {
        this.subArrayStartIndex = Math.abs((this.subArrayStartIndex + moveLength) % this.props.array.length)
        return this.currentCompute()
    }

    current() {
        return this.subArrayStartIndex
    }
}
