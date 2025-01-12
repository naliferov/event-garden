export const eventGardenFactory = () => {

    const eventGarden = {
        events: [],
        subscriber: null,        
        interruptor: null,

        pub(event) {
            this.events.push(event)
            if (this.interruptor) {
                this.removeInterruptor()
            }
        },
        sub(subscriber) {
            this.subscriber = subscriber
            //add ability to subscribe after publish and receive events
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
                if (event && this.subscriber) {
                    await this.subscriber(event)
                }
                if (this.events.length === 0) {
                    await this.addInterruptor()
                }
            }
        },
    }

    return eventGarden
}