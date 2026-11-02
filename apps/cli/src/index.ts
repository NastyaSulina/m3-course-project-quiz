import {
    show,
    outline,
    type Quiz,
    loadSettings,
    loadSavedGame,
    countKinds as kinds,
} from '@platform/quiz/game-core'
import GameState from '@platform/quiz/game-state'
import { savedSettings, savedGame } from './saved.ts'
import readQuiz from '@platform/quiz/quizzes'

let quiz: Quiz

try {
    quiz = await readQuiz('playlist')
} catch (e) {
    console.error(e instanceof Error ? e.message : e)
    process.exit(1)
}

const game = new GameState(quiz.outcomes)

const settings = loadSettings(savedSettings)
const { answers } = loadSavedGame(savedGame)

console.log(`\nHello, ${settings.name}!`)
console.log(`\n${quiz.title}`)

console.log('\nOutline\n')
console.log(outline(quiz))

const counts = kinds(quiz)

console.log(`\nKinds: choice ${counts.choice}, scale ${counts.scale}, yesno ${counts.yesno}`)

game.start()

for (const [index, question] of quiz.questions.entries()) {
    const answer = answers[index]

    console.log(`\nQuestion ${index + 1}/${quiz.questions.length}`)
    console.log(show(question, settings))

    const { outcome, points } = game.record(question, answer)

    console.log(`Answer worth ${points} ${points === 1 ? 'point' : 'points'} for ${outcome}`)
}

game.finish()
const result = game.result()

console.log(`\nYou are: ${result.title}`)
console.log(result.description)

console.log('\nYou got this because:')

const reasons = game.explain()
for (const reason of reasons) {
    console.log(`— ${reason}`)
}

console.log('')

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
