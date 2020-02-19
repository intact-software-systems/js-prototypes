require('log-timestamp')

const CircularSubArray = require('test/carousel/CircularSubArray')

const allChannels = require('samples/channels.json')

const categoryChannels = allChannels[0].visibleChannels

const smallArray = categoryChannels.map(s => s.id)
console.log(JSON.stringify(smallArray))

const circularArray = new CircularSubArray(smallArray, 5, 0)

console.log(JSON.stringify(circularArray.currentCompute()))
console.log('Start from ' + circularArray.current())


for (let i = 0; i < 10; i++) {
    const randomNumber = Math.random()
    const randomMove = Math.floor(randomNumber * 10)

    if (randomNumber > 0.5) {
        console.log('Right: ' + randomMove + ' ' + JSON.stringify(circularArray.rightCompute(randomMove)))
    }
    else {
        console.log('Left: ' + randomMove + ' ' + JSON.stringify(circularArray.leftCompute(randomMove)))
    }
    console.log('Current index ' + circularArray.current())
}
