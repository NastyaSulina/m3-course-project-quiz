import type { Quiz } from '@platform/quiz/game-core'
import readQuiz from '@platform/quiz/quizzes'

export async function findQuiz(name: string): Promise<Quiz | undefined> {
    if (!/^[a-z0-9-]+$/.test(name)) {
        return undefined
    }

    try {
        return await readQuiz(name)
    } catch (error) {
        if (
            error instanceof Error &&
            error.cause instanceof Error &&
            'code' in error.cause &&
            error.cause.code === 'ENOENT'
        ) {
            return undefined
        }

        throw error
    }
}
