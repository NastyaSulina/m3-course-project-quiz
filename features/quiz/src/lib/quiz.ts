import { QuestionKind, type Answer, type Question, type Settings } from './types.ts'

export function show(question: Question, settings: Settings): string {
    const hint = settings.hints && question.hint ? `\nHint: ${question.hint}` : ''

    if (question.kind === 'choice') {
        const choices = question.choices.map((choice, index) => `  ${index + 1}. ${choice.label}`)

        return `${question.text}\n${choices.join('\n')}${hint}`
    }

    if (question.kind === QuestionKind.yesno) {
        return `${question.text} (Yes or No)${hint}`
    }

    if (question.kind === QuestionKind.scale) {
        return `${question.text}\n0 = ${question.low}\n2 = ${question.high}${hint}`
    }

    throw new Error('Unknown kind')
}

export function recap(question: Question, answer: Answer): string {
    if (answer.kind !== question.kind) {
        throw new Error('The answer and the question are not of the same kind')
    }

    if (answer.kind === QuestionKind.choice) {
        return `${question.text} You chose "${answer.picked.label}".`
    }

    if (answer.kind === QuestionKind.scale) {
        return `${question.text} You rated it ${answer.value} out of 2.`
    }

    if (answer.kind === QuestionKind.yesno) {
        return `${question.text} You said "${answer.value ? 'yes' : 'no'}".`
    }

    throw new Error('Unknown kind')
}
