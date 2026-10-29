import {
    award,
    OutcomeId,
    recap,
    type Answer,
    type Award,
    type Outcome,
    type Question,
} from '../quiz-core/index.ts'

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
    private scores: Record<OutcomeId, number> = {
        [OutcomeId.underground]: 0,
        [OutcomeId.comfort]: 0,
        [OutcomeId.hit]: 0,
        [OutcomeId.party]: 0,
    }
    private reasons: Record<OutcomeId, string[]> = {
        [OutcomeId.underground]: [],
        [OutcomeId.comfort]: [],
        [OutcomeId.hit]: [],
        [OutcomeId.party]: [],
    }

    private outcomes: Outcome[]
    private status: SessionStatus = SessionStatus.waiting

    constructor(outcomes: Outcome[]) {
        this.outcomes = outcomes
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
