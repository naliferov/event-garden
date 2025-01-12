import { eventGardenFactory } from '../index.js'

const hanger = {
    hang: null,
    start() {
        const dayTTL = 86400000
        this.hang = setInterval(() => {}, dayTTL)
    },
    stop() {
        if (this.hang) {
            clearInterval(this.hang)
            this.hang = null
        }
    },
}

hanger.start()

const eventGarden = eventGardenFactory()
eventGarden.start()

const testEvent = { id: 'rocket launched' }

let handledEventCount = 0

eventGarden.sub(async (event) => {
    ++handledEventCount
})
eventGarden.pub(testEvent)

setTimeout(() => eventGarden.pub(testEvent), 200)
setTimeout(() => {
    hanger.stop()
    if (handledEventCount !== 2) {
        throw new Error('Test failed. Expected handledEventCount to be 2')
    }
}, 300)