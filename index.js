//import fs from 'node:fs/promises'

export const eventGardenFactory = () => {

    const eventGarden = {
        events: [],
        subscriber: null,
        
        //maxEventsPerSecond: 50,
        interruptor: null,

        hangProcess() {
            setInterval(() => {}, 86400000)
        },
        pub(event) {
            this.events.push(event)
            this.removeInterruptor()
        },
        sub(subscriber) {
            this.subscriber = subscriber
        },
        addInterruptor() {
            this.interruptor = Promise.withResolvers()
            return this.interruptor.promise
        },
        removeInterruptor() {
            this.interruptor.resolve()
            this.interruptor = null
        },
        async start() {
            while (true) {
                const event = this.events.shift()
                if (event) {
                    console.log('call eventHandler and pass event', event)
                }

                if (this.events.length === 0) {
                    console.log('addInterruptor')
                    await this.addInterruptor()
                    console.log('after interruptor')
                }
            }
        },
    }

    return eventGarden
}