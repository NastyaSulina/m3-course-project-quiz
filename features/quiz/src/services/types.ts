import type { Prompt } from '../game-core/index.ts'

export interface QuizResponse {
    prompts: Prompt[]
    title: string
}

export interface StartSessionResponse {
    session_id: string
}

export interface ResultResponse {
    title: string
    description: string
    reasons: string[]
}

export interface ProgressResponse {
    answered: number
    total: number
}
