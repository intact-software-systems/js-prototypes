require('log-timestamp')

const Carousel = require('../../src/carousel/Carousel')
const allChannels = require('../../samples/channels.json')

const categoryChannels = allChannels[0].visibleChannels

const smallArray = categoryChannels.map(s => s.id)
console.log(JSON.stringify(smallArray))

const carousel = new Carousel(smallArray, 7, 0)
const completeCarousel = carousel.completeCarousel()
console.log('Complete carousel length ' + completeCarousel.length + ' : ' + JSON.stringify(completeCarousel))

const array = carousel.computeCarousel()
console.log('Visible carousel length ' + array.length + ' : ' + JSON.stringify(array) + ' Current index ' + carousel.current() + ' Current carousel index ' + carousel.carouselCurrent())

for (let i = 0; i < 10; i++) {
    const randomNumber = Math.random()
    const randomMove = Math.floor(randomNumber * 10)

    if (randomNumber > 0.5) {
        console.log('Right: ' + randomMove + ' ' + JSON.stringify(carousel.moveRightCompute(randomMove)))
    }
    else {
        console.log('Left: ' + randomMove + ' ' + JSON.stringify(carousel.moveLeftCompute(randomMove)))
    }
    console.log('Current index ' + carousel.current())
    console.log('Current carousel index ' + carousel.carouselCurrent())
}
