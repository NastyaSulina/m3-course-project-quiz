import {
    award,
    recap,
    type Answer,
    type Award,
    type Outcome,
    type Question,
} from '../core/index.ts'

enum SessionStatus {
    waiting = 'waiting',
    asking = 'asking',
    done = 'done',
}

class SessionError extends Error {
    constructor(message: string, sessionStatus: SessionStatus) {
        super(`${message}. Current status: ${sessionStatus}`)
        this.name = 'SessionError'
    }
}

export class Session {
    private scores: Record<string, number> = {}
    private reasons: Record<string, string[]> = {}

    private outcomes: Outcome[]
    private status: SessionStatus = SessionStatus.waiting

    constructor(outcomes: Outcome[]) {
        this.outcomes = outcomes

        for (const outcome of outcomes) {
            this.scores[outcome.id] = 0
            this.reasons[outcome.id] = []
        }
    }

    public start(): void {
        if (this.status !== SessionStatus.waiting) {
            throw new SessionError('The quiz has already started', this.status)
        }

        this.status = SessionStatus.asking
    }

    public record(question: Question, answer: Answer): Award {
        if (this.status !== SessionStatus.asking) {
            throw new SessionError('Cannot record an answer', this.status)
        }

        const { outcome, points } = award(question, answer)

        if (points > 0) {
            this.scores[outcome] += points

            this.reasons[outcome].push(recap(question, answer))
        }

        return { outcome, points }
    }

    public finish(): void {
        if (this.status !== SessionStatus.asking) {
            throw new SessionError('Cannot finish the quiz', this.status)
        }

        if (!Object.values(this.scores).some((value) => value > 0)) {
            throw new Error('No points have been scored')
        }

        this.status = SessionStatus.done
    }

    public result(): Outcome {
        if (this.status !== SessionStatus.done) {
            throw new SessionError('Cannot get the result', this.status)
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
        if (this.status !== SessionStatus.done) {
            throw new SessionError('Cannot get the explanation', this.status)
        }

        const best = this.result()

        return [...this.reasons[best.id]]
    }
}
