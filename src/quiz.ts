import { QuestionKind, type Answer, type Question } from './types.ts'

export function show(question: Question): string {
    if (question.kind === QuestionKind.choice) {
        return `${question.text}\n${question.choices.map((choice, i) => `${i + 1}. ${choice.label}`).join('\n')}`
    }

    if (question.kind === QuestionKind.yesno) {
        return `${question.text} (Yes or No)`
    }

    if (question.kind === QuestionKind.scale) {
        return `${question.text}\n0 = ${question.low}\n3 = ${question.high}`
    }

    throw new Error('Unknown kind')
}

export function award(answer: Answer): number {
    if (answer.kind === QuestionKind.choice) {
        return answer.picked.points
    }

    if (answer.kind === QuestionKind.scale) {
        return answer.value
    }

    if (answer.kind === QuestionKind.yesno) {
        return answer.value ? 3 : 0
    }

    throw new Error('Unknown kind')
}

export function recap(question: Question, answer: Answer): string {
    if (answer.kind !== question.kind) {
        throw new Error('The answer and the question are not of the same kind')
    }

    if (answer.kind === QuestionKind.choice) {
        return `You chose "${answer.picked.label}".`
    }

    if (answer.kind === QuestionKind.scale) {
        return `You rated it ${answer.value} out of 3.`
    }

    if (answer.kind === QuestionKind.yesno) {
        return `You said "${answer.value ? 'yes' : 'no'}".`
    }

    throw new Error('Unknown kind')
}
