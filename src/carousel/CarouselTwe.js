module.exports = class CarouselTwe {
    constructor(array, carouselLength, currentIndex = 0) {
        this.props = {
            array: array,
            carouselArray: array.concat(array, array),
            carouselLength: Math.min(array.length * 3, carouselLength)
        };
        this.currentIndex = currentIndex;
    }

    moveLeft(moveLength) {
        this.currentIndex = this.newLeft(moveLength);
        return this.computeCarousel(this.currentIndex)
    }

    moveRight(moveLength) {
        this.currentIndex = this.newRight(moveLength);
        return this.computeCarousel(this.currentIndex)
    }

    computeCarousel(index = this.currentIndex) {
        const begin = this.computeStartPos(index);
        const end = this.computeEndPos(index);

        return this.props.carouselArray.slice(begin, end);
    }

    current() {
        return this.currentIndex;
    }

    carouselCurrent() {
        return this.computeStartPos(this.currentIndex);
    }

    completeCarousel() {
        return this.props.carouselArray;
    }

    computeStartPos(index) {
        return this.toCarouselIndex(index);
    }

    computeEndPos(index) {
        return this.toCarouselIndex(index) + this.props.carouselLength;
    }

    toCarouselIndex(currentIndex) {
        return currentIndex + this.props.array.length;
    }

    newLeft(moveLength) {
        return this.isLeftMoveToStart(moveLength) ? 0 : this.left(moveLength);
    }

    newRight(moveLength) {
        return this.isRightMoveBeyondEnd(moveLength) ? 0 : this.right(moveLength);
    }

    left(moveLength) {
        const newVar = this.currentIndex - moveLength + this.props.array.length;
        return Math.abs(newVar % this.props.array.length);
    }

    right(moveLength) {
        return Math.abs((this.currentIndex + moveLength) % this.props.array.length);
    }

    isLeftMoveToStart(moveLength) {
        return this.isLeftMoveBeyondStart(moveLength) && this.currentIndex !== 0;
    }

    isLeftMoveBeyondStart(moveLength) {
        return this.currentIndex - moveLength < 0;
    }

    isRightMoveBeyondEnd(moveLength) {
        return this.currentIndex + moveLength >= this.props.array.length;
    }
}
