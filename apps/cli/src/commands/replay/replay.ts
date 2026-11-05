import {
    outline,
    countKinds as kinds,
    recap,
    show,
    type QuizResponse,
} from '@platform/quiz/game-core'

import { locateSavedGame, locateSettings, readSavedGame, readSettings } from '../../files/index.ts'
import { call } from '../../call.ts'

export default async function replay(quizName: string): Promise<void> {
    const quiz = await call<QuizResponse>(`/quizzes/${encodeURIComponent(quizName)}`)
    const settings = await readSettings(locateSettings())
    const { answers } = await readSavedGame(locateSavedGame())

    console.log(`\nHello, ${settings.name}!`)
    console.log(`\n${quiz.title}`)

    console.log('\nOutline\n')
    console.log(outline(quiz.prompts))

    const counts = kinds(quiz.prompts)
    console.log(`\nKinds: choice ${counts.choice}, scale ${counts.scale}, yesno ${counts.yesno}`)

    const { session_id: sessionId } = await call<{ session_id: string }>('/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ quiz: quizName }),
    })

    for (const [index, prompt] of quiz.prompts.entries()) {
        const submission = answers[index]

        if (!submission) {
            throw new Error(`No saved answer for question ${index + 1}`)
        }

        console.log(`\nQuestion ${index + 1}/${quiz.prompts.length}`)
        console.log(show(prompt, settings))

        await call('/session/answer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-session-id': sessionId,
            },
            body: JSON.stringify(submission),
        })
    }

    console.log('\nRecap\n')

    for (const [index, prompt] of quiz.prompts.entries()) {
        console.log(recap(prompt, answers[index]))
    }

    const result = await call<{
        title: string
        description: string
        reasons: string[]
    }>('/session/result', {
        headers: { 'x-session-id': sessionId },
    })

    console.log(`\nYou are: ${result.title}`)
    console.log(result.description)

    console.log('\nYou got this because:')

    for (const reason of result.reasons) {
        console.log(`— ${reason}`)
    }
}
