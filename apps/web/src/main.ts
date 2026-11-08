import { getProgress, getQuiz, getResult, sendAnswer, startSession } from '@platform/quiz/services'

import ask from './ask/index.ts'
import show from './show/index.ts'

const app = document.querySelector<HTMLElement>('#app')

if (!app) {
    throw new Error('No element with id "app"')
}

await play(app, 'playlist')

async function play(app: HTMLElement, quizName: string): Promise<void> {
    try {
        const quiz = await getQuiz(quizName)
        const sessionId = await startSession(quizName)

        for (const prompt of quiz.prompts) {
            const { answered, total } = await getProgress(sessionId)
            const progress = `Question ${answered + 1} of ${total}`

            const submission = await ask(app, prompt, progress)

            await sendAnswer(sessionId, submission)
        }

        const result = await getResult(sessionId)
        show(app, result)
    } catch (error) {
        app.textContent = error instanceof Error ? error.message : String(error)
    }
}
