import { outline, countKinds as kinds, type Answer, recap } from '@platform/quiz/game-core'
import { locateSettings, readSettings } from '../../files/index.ts'
import GameState from '@platform/quiz/game-state'
import readQuiz from '@platform/quiz/quizzes'
import { ask } from './ask.ts'

export default async function play(quizName: string, options: { name?: string }): Promise<void> {
    const quiz = await readQuiz(quizName)
    const settings = await readSettings(locateSettings())
    const answers: Answer[] = []

    const game = new GameState(quiz.outcomes)

    console.log(`\nHello, ${options.name ?? settings.name ?? 'player'}!`)
    console.log(`\n${quiz.title}`)

    console.log('\nOutline\n')
    console.log(outline(quiz))

    const counts = kinds(quiz)
    console.log(`\nKinds: choice ${counts.choice}, scale ${counts.scale}, yesno ${counts.yesno}\n`)

    game.start()

    for (const question of quiz.questions) {
        const answer = await ask(settings, question)
        const { outcome, points } = game.record(question, answer)

        answers.push(answer)

        console.log(`Answer worth ${points} ${points === 1 ? 'point' : 'points'} for ${outcome}`)
    }

    console.log('\nRecap\n')

    for (const [index, question] of quiz.questions.entries()) {
        console.log(recap(question, answers[index]))
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
}
