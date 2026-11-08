import './style.css'

import { getProgress, getQuiz, getResult, sendAnswer, startSession } from '@platform/quiz/services'

import ask from './ask/index.ts'
import show from './show/index.ts'

const app = document.querySelector<HTMLElement>('#app')
const title = document.querySelector<HTMLElement>('#quiz-title')

if (!app || !title) {
    throw new Error('No element with id "app" or "quiz-title"')
}

await play(app, title, 'playlist')

async function play(app: HTMLElement, title: HTMLElement, quizName: string): Promise<void> {
    try {
        const quiz = await getQuiz(quizName)
        const sessionId = await startSession(quizName)

        title.textContent = quiz.title

        for (const prompt of quiz.prompts) {
            const { answered, total } = await getProgress(sessionId)
            const progress = `Question ${answered + 1} of ${total}`

            const submission = await ask(app, prompt, progress)

            await sendAnswer(sessionId, submission)
        }

        const result = await getResult(sessionId)

        const onRestart = () => {
            void play(app, title, quizName)
        }

        show(app, result, onRestart)
    } catch (error) {
        app.textContent = error instanceof Error ? error.message : String(error)
    }
}
