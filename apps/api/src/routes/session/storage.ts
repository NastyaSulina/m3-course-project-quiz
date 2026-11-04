import { randomUUID } from 'node:crypto'

import type { Quiz } from '@platform/quiz/game-core'
import GameState from '@platform/quiz/game-state'

interface Entry {
    quiz: Quiz
    game: GameState
    answered: number
    finished: boolean
}

const sessions = new Map<string, Entry>()

export function create(quiz: Quiz): string {
    const game = new GameState(quiz.outcomes)
    game.start()

    const id = randomUUID()

    sessions.set(id, {
        quiz,
        game,
        answered: 0,
        finished: false,
    })

    return id
}

export function findSessionById(id: string | undefined): Entry | undefined {
    return id === undefined ? undefined : sessions.get(id)
}
