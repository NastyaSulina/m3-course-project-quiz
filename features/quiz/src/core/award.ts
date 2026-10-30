import { QuestionKind, type Answer, type Question } from './types.ts'

export interface Award {
    outcome: string
    points: number
}

export function award(question: Question, answer: Answer): Award {
    if (question.kind !== answer.kind) {
        throw new Error('The answer does not match the question')
    }

    if (question.kind === QuestionKind.choice && answer.kind === QuestionKind.choice) {
        return { outcome: answer.picked.outcome, points: answer.picked.points }
    }

    if (question.kind === QuestionKind.scale && answer.kind === QuestionKind.scale) {
        return { outcome: question.outcome, points: answer.value }
    }

    if (question.kind === QuestionKind.yesno && answer.kind === QuestionKind.yesno) {
        return { outcome: question.outcome, points: answer.value ? 2 : 0 }
    }

    throw new Error('Unknown kind')
}
