import { outline, countKinds as kinds, recap, show } from '@platform/quiz/game-core'
import { getQuiz, getResult, sendAnswer, startSession } from '@platform/quiz/services'

import { locateSavedGame, locateSettings, readSavedGame, readSettings } from '../../files/index.ts'

export default async function replay(quizName: string): Promise<void> {
    const quiz = await getQuiz(quizName)
    const settings = await readSettings(locateSettings())
    const { answers } = await readSavedGame(locateSavedGame())

    console.log(`\nHello, ${settings.name}!`)
    console.log(`\n${quiz.title}`)

    console.log('\nOutline\n')
    console.log(outline(quiz.prompts))

    const counts = kinds(quiz.prompts)
    console.log(`\nKinds: choice ${counts.choice}, scale ${counts.scale}, yesno ${counts.yesno}`)

    const sessionId = await startSession(quizName)

    for (const [index, prompt] of quiz.prompts.entries()) {
        const submission = answers[index]

        if (!submission) {
            throw new Error(`No saved answer for question ${index + 1}`)
        }

        console.log(`\nQuestion ${index + 1}/${quiz.prompts.length}`)
        console.log(show(prompt, settings))

        await sendAnswer(sessionId, submission)
    }

    console.log('\nRecap\n')

    for (const [index, prompt] of quiz.prompts.entries()) {
        console.log(recap(prompt, answers[index]))
    }

    const result = await getResult(sessionId)

    console.log(`\nYou are: ${result.title}`)
    console.log(result.description)

    console.log('\nYou got this because:')

    for (const reason of result.reasons) {
        console.log(`— ${reason}`)
    }
}
