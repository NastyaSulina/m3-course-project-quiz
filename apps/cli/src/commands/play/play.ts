import { countKinds as kinds, outline, recap, type Submission } from '@platform/quiz/game-core'
import { getQuiz, getResult, sendAnswer, startSession } from '@platform/quiz/services'

import { locateSettings, readSettings } from '../../files/index.ts'
import { ask } from './ask.ts'

interface Options {
    name?: string
}

export default async function play(quizName: string, options: Options): Promise<void> {
    const quiz = await getQuiz(quizName)
    const settings = await readSettings(locateSettings())

    console.log(`\nHello, ${options.name ?? settings.name ?? 'player'}!`)
    console.log(`\n${quiz.title}`)

    console.log('\nOutline\n')
    console.log(outline(quiz.prompts))

    const counts = kinds(quiz.prompts)
    console.log(`\nKinds: choice ${counts.choice}, scale ${counts.scale}, yesno ${counts.yesno}`)

    const sessionId = await startSession(quizName)

    const submissions: Submission[] = []

    console.log('\nQuestions\n')
    for (const prompt of quiz.prompts) {
        const submission = await ask(settings, prompt)

        await sendAnswer(sessionId, submission)

        submissions.push(submission)
    }

    console.log('\nRecap\n')

    for (const [index, prompt] of quiz.prompts.entries()) {
        console.log(recap(prompt, submissions[index]))
    }

    const result = await getResult(sessionId)

    console.log(`\nYou are: ${result.title}`)
    console.log(result.description)

    console.log('\nYou got this because:')

    for (const reason of result.reasons) {
        console.log(`— ${reason}`)
    }
}
