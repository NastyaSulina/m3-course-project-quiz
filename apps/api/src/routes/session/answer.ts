import { QuestionKind, type Answer, type Question, type Submission } from '@platform/quiz/game-core'

export function toAnswer(question: Question, submission: Submission): Answer | undefined {
    if (question.kind === QuestionKind.choice) {
        if (submission.kind !== 'choice') {
            return undefined
        }

        const picked = question.choices.find((choice) => choice.label === submission.picked?.label)

        if (!picked) {
            return undefined
        }

        return { kind: QuestionKind.choice, picked }
    }

    if (question.kind === QuestionKind.scale) {
        if (
            submission.kind !== 'scale' ||
            !Number.isInteger(submission.value) ||
            submission.value < 0 ||
            submission.value > 2
        ) {
            return undefined
        }

        return { kind: QuestionKind.scale, value: submission.value }
    }

    if (question.kind === QuestionKind.yesno) {
        if (submission.kind !== 'yesno' || typeof submission.value !== 'boolean') {
            return undefined
        }

        return { kind: QuestionKind.yesno, value: submission.value }
    }

    throw new Error('Unknown kind')
}
