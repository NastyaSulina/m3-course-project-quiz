import { isQuiz, type Quiz } from '../game-core/index.ts'

export function loadQuiz(quiz: string, quizName: string): Quiz {
    let value: unknown

    try {
        value = JSON.parse(quiz)
    } catch {
        throw new Error(`The quiz "${quizName}" is not valid JSON`)
    }

    if (!isQuiz(value)) {
        throw new Error(`The quiz "${quizName}" does not have the shape of a quiz`)
    }

    return value
}
