import { eventGardenFactory } from '../index.js'

const eventGarden = eventGardenFactory()

eventGarden.hangProcess()
eventGarden.start()

//event-source file

setTimeout(() => {
    eventGarden.pub({ eventName: 'pizza delivered' })
}, 2000)
//generate this with promise and put to event
//получение новых ивентов или ручная генерация новых

// setInterval(async () => {
//     let input
//     try {
//         const inputJson = await fs.readFile(this.inputPath, 'utf-8')
//         input = JSON.parse(configJson)
//     } catch (e) {
//         console.error('error in config proccing', e)
//     }
// }, 2000)