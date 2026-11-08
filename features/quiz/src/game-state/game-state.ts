import {
    type Answer,
    type Award,
    award,
    type Outcome,
    type Question,
    recap,
} from '../game-core/index.ts'

enum GameStatus {
    waiting = 'waiting',
    asking = 'asking',
    done = 'done',
}

class GameError extends Error {
    constructor(message: string, GameStatus: GameStatus) {
        super(`${message}. Current status: ${GameStatus}`)
        this.name = 'GameError'
    }
}

class GameState {
    private scores: Record<string, number> = {}
    private reasons: Record<string, string[]> = {}

    private outcomes: Outcome[]
    private status: GameStatus = GameStatus.waiting

    constructor(outcomes: Outcome[]) {
        this.outcomes = outcomes

        for (const outcome of outcomes) {
            this.scores[outcome.id] = 0
            this.reasons[outcome.id] = []
        }
    }

    public start(): void {
        if (this.status !== GameStatus.waiting) {
            throw new GameError('The quiz has already started', this.status)
        }

        this.status = GameStatus.asking
    }

    public record(question: Question, answer: Answer): Award {
        if (this.status !== GameStatus.asking) {
            throw new GameError('Cannot record an answer', this.status)
        }

        const { outcome, points } = award(question, answer)

        if (points > 0) {
            this.scores[outcome] += points

            this.reasons[outcome].push(recap(question, answer))
        }

        return { outcome, points }
    }

    public finish(): void {
        if (this.status !== GameStatus.asking) {
            throw new GameError('Cannot finish the quiz', this.status)
        }

        if (!Object.values(this.scores).some((value) => value > 0)) {
            throw new Error('No points have been scored')
        }

        this.status = GameStatus.done
    }

    public result(): Outcome {
        if (this.status !== GameStatus.done) {
            throw new GameError('Cannot get the result', this.status)
        }

        let best = this.outcomes[0]

        for (const outcome of this.outcomes) {
            if (this.scores[outcome.id] > this.scores[best.id]) {
                best = outcome
            }
        }

        return best
    }

    public explain(): string[] {
        if (this.status !== GameStatus.done) {
            throw new GameError('Cannot get the explanation', this.status)
        }

        const best = this.result()

        return [...this.reasons[best.id]]
    }
}

export default GameState
