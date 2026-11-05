import {
    outline,
    countKinds as kinds,
    recap,
    type Submission,
    type QuizResponse,
} from '@platform/quiz/game-core'
import { ask } from './ask.ts'
import { locateSettings, readSettings } from '../../files/index.ts'

const BASE_URL = 'http://localhost:3000'

interface Options {
    name?: string
}

export default async function play(quizName: string, options: Options): Promise<void> {
    const quiz = await call<QuizResponse>(`/quizzes/${encodeURIComponent(quizName)}`)
    const settings = await readSettings(locateSettings())

    console.log(`\nHello, ${options.name ?? settings.name ?? 'player'}!`)
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
    const submissions: Submission[] = []

    console.log('\nQuestions\n')
    for (const prompt of quiz.prompts) {
        const submission = await ask(settings, prompt)

        console.log(JSON.stringify(submission))

        await call('/session/answer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-session-id': sessionId,
            },
            body: JSON.stringify(submission),
        })

        submissions.push(submission)
    }

    console.log('\nRecap\n')

    for (const [index, prompt] of quiz.prompts.entries()) {
        console.log(recap(prompt, submissions[index]))
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

function call(path: string, init?: RequestInit): Promise<void>
function call<CallResponse>(path: string, init?: RequestInit): Promise<CallResponse>

async function call<CallResponse>(path: string, init?: RequestInit): Promise<CallResponse | void> {
    let response: Response

    try {
        response = await fetch(`${BASE_URL}${path}`, init)
    } catch {
        throw new Error(`Cannot reach the server at ${BASE_URL}`)
    }

    if (!response.ok) {
        const body: unknown = await response.json()

        if (
            typeof body === 'object' &&
            body !== null &&
            'error' in body &&
            typeof body.error === 'string'
        ) {
            throw new Error(body.error)
        }

        throw new Error(`The server answered ${response.status}`)
    }

    if (response.status === 204) {
        return
    }

    return response.json() as CallResponse
}
