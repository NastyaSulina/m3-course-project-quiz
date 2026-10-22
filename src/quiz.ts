import { QuestionKind, type Question } from './types.ts'

export function show(question: Question): string {
    if (question.kind === QuestionKind.choice) {
        return `${question.text}\n${question.choices.map((x, i) => `${i + 1}. ${x.label}`).join('\n')}`
    }

    if (question.kind === QuestionKind.yesno) {
        return `${question.text} (Yes or No)`
    }

    if (question.kind === QuestionKind.scale) {
        return `${question.text} (0 = ${question.low} 3 = ${question.high})`
    }
    throw new Error('Unknown kind')
}
