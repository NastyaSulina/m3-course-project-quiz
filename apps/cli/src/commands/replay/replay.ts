import { recap, show } from '@platform/quiz/game-core'
import GameState from '@platform/quiz/game-state'
import readQuiz from '@platform/quiz/quizzes'

import { locateSavedGame, locateSettings, readSavedGame, readSettings } from '../../files/index.ts'

export default async function replay(quizName: string): Promise<void> {
    const quiz = await readQuiz(quizName)
    const settings = await readSettings(locateSettings())
    const { answers } = await readSavedGame(locateSavedGame())

    const game = new GameState(quiz.outcomes)

    console.log(`\nHello, ${settings.name}!`)
    console.log(`\n${quiz.title}`)

    game.start()

    for (const [index, question] of quiz.questions.entries()) {
        const answer = answers[index]

        if (!answer) {
            throw new Error(`No saved answer for question ${index + 1}`)
        }

        const { outcome, points } = game.record(question, answer)

        console.log(`\nQuestion ${index + 1}/${quiz.questions.length}`)
        console.log(show(question, settings))

        console.log(`Answer worth ${points} ${points === 1 ? 'point' : 'points'} for ${outcome}`)
    }

    game.finish()
    const result = game.result()

    console.log('\nRecap\n')

    for (const [index, question] of quiz.questions.entries()) {
        console.log(recap(question, answers[index]))
    }

    console.log(`\nYou are: ${result.title}`)
    console.log(result.description)
}
