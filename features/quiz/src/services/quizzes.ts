import { request } from './request.ts'
import type { QuizResponse } from './types.ts'

export async function getQuiz(name: string): Promise<QuizResponse> {
    return request<QuizResponse>({ path: `/quizzes/${encodeURIComponent(name)}` })
}
