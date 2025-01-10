import fs from 'node:fs/promises'

let events = []
let interrupt

const interuptOn = () => {
    interrupt = Promise.withResolvers()
    return interrupt.promise
}
const interuptOff = () => {
    interrupt.resolve('interuptOff')
    interrupt = null
}

const gen = async function*() {
    while (true) {
        for (let i = 0; i < events.length; i++) {
            console.log('event promise')
            yield await events[i]
        }
        events = []
        events.push(interuptOn())
    }
}

setInterval(async () => {
    let config
    try {
        const configJson = await fs.readFile('./config.json', 'utf-8')
        config = JSON.parse(configJson)
    } catch (e) {
        console.error('error in config proccing', e)
    }
}, 2000)

for await (const val of gen()) {
    console.log(val)
}


const reploid = () => {

}