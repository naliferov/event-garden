import fs from 'node:fs/promises'

export const reploidFactory = () => {

    const reploid = {
        events: [],
        eventHandler: null,
        inputInterval: null,
        
        maxEventsPerSecond: 50,
        isWorking: false,
        interruptor: null,

        pause: () => {
            this.interruptor = Promise.withResolvers()
            return this.interruptor.promise
        },
        play() {
            this.interruptor.resolve('interruptor off')
            this.interruptor = null
        },
        async start() {
            //generate this with promise and put to event

            // setInterval(async () => {
            //     let input
            //     try {
            //         const inputJson = await fs.readFile(this.inputPath, 'utf-8')
            //         input = JSON.parse(configJson)
            //     } catch (e) {
            //         console.error('error in config proccing', e)
            //     }
            // }, 2000)

            while (true) {
                for (let i = 0; i < events.length; i++) {
                    console.log('event promise')
                    this.eventHandler(await events[i])
                }
                events = []
                events.push(this.pause())
            }
        },
        setInputPath() {
        },
        setEventHandler(eventHandler) {
            this.eventHandler = eventHandler
        },
    }

    return reploid
}