import type { Submission } from '../game-core/index.ts'
import { request } from './request.ts'
import type { StartSessionResponse, ResultResponse, ProgressResponse } from './types.ts'

export async function startSession(quiz: string): Promise<string> {
    const { session_id } = await request<StartSessionResponse, { quiz: string }>({
        path: '/session',
        method: 'POST',
        body: { quiz },
    })

    return session_id
}

export async function sendAnswer(id: string, submission: Submission): Promise<void> {
    await request({
        path: '/session/answer',
        method: 'POST',
        headers: { 'x-session-id': id },
        body: submission,
    })
}

export async function getResult(id: string): Promise<ResultResponse> {
    const result = await request<ResultResponse>({
        path: '/session/result',
        headers: {
            'x-session-id': id,
        },
    })

    return result
}

export async function getProgress(id: string): Promise<ProgressResponse> {
    return request<ProgressResponse>({
        path: '/session',
        headers: { 'x-session-id': id },
    })
}
