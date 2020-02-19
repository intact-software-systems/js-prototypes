module.exports = class Carousel {
    constructor(array, carouselLength, currentIndex = 0) {
        this.props = {
            array: array,
            carouselArray: carouselLength >= array.length ? array : array.concat(array, array),
            carouselLength: carouselLength
        }
        this.currentIndex = currentIndex
    }

    left(moveLength) {
        this.currentIndex = Math.abs(((this.currentIndex - moveLength) + this.props.array.length) % this.props.array.length)
    }

    right(moveLength) {
        this.currentIndex = Math.abs((this.currentIndex + moveLength) % this.props.array.length)
    }

    moveLeftCompute(moveLength) {
        this.left(moveLength)
        return this.computeCarousel()
    }

    moveRightCompute(moveLength) {
        this.right(moveLength)
        return this.computeCarousel()
    }

    computeCarousel() {
        const begin = this.computeStartPos()
        const end = this.computeEndPos()

        return this.props.carouselArray.slice(begin, end)
    }

    current() {
        return this.currentIndex
    }

    carouselCurrent() {
        return this.computeStartPos()
    }

    completeCarousel() {
        return this.props.carouselArray
    }

    computeStartPos() {
        return this.toCarouselIndex(this.currentIndex)
    }

    computeEndPos() {
        return this.toCarouselIndex(this.currentIndex) + this.props.carouselLength
    }

    toCarouselIndex(currentIndex) {
        return this.props.carouselArray.length === this.props.array.length
            ? currentIndex
            : currentIndex + this.props.array.length
    }
}
