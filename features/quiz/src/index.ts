import { quiz, QUIZ_TITLE } from './data.ts'
import { loadSavedGame, loadSettings } from './lib/load.ts'
import { show } from './lib/quiz.ts'
import { Session } from './lib/session.ts'
import { savedGame, savedSettings } from './saved.ts'

const session = new Session(quiz.outcomes)

const settings = loadSettings(savedSettings)
const { answers } = loadSavedGame(savedGame)

console.log(`\nHello, ${settings.name}!`)
console.log(`\n${QUIZ_TITLE}`)

session.start()

for (const [index, question] of quiz.questions.entries()) {
    const answer = answers[index]

    console.log(`\nQuestion ${index + 1}/${quiz.questions.length}`)
    console.log(show(question, settings))

    const { outcome, points } = session.record(question, answer)

    console.log(`Answer worth ${points} ${points === 1 ? 'point' : 'points'} for ${outcome}`)
}

session.finish()
const result = session.result()

console.log(`\nYou are: ${result.title}`)
console.log(result.description)

console.log('\nYou got this because:')

const reasons = session.explain()
for (const reason of reasons) {
    console.log(`— ${reason}`)
}

try {
    loadSettings('{"name":5,"hints":true}')
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message)
    }
}

try {
    loadSettings('{"name":"Anastasiia","hints"}')
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message)
    }
}
