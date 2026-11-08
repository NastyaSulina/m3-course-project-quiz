import { type Prompt, QuestionKind, type Settings, type Submission } from './types.ts'

export function show(question: Prompt, settings: Settings): string {
    const hint = settings.hints && question.hint ? `\nHint: ${question.hint}` : ''

    if (question.kind === QuestionKind.choice) {
        const choices = question.choices.map((choice, index) => `  ${index + 1}. ${choice.label}`)

        return `${question.text}\n${choices.join('\n')}${hint}`
    }

    if (question.kind === QuestionKind.yesno) {
        return `${question.text} (Yes or No)${hint}`
    }

    if (question.kind === QuestionKind.scale) {
        return `${question.text}\n${question.min} = ${question.min_label}\n${question.max} = ${question.max_label}${hint}`
    }

    throw new Error('Unknown kind')
}

export function recap(question: Prompt, answer: Submission): string {
    if (answer.kind !== question.kind) {
        throw new Error('The answer and the question are not of the same kind')
    }

    if (answer.kind === QuestionKind.choice) {
        return `${question.text} You chose "${answer.picked.label}".`
    }

    if (answer.kind === QuestionKind.scale && question.kind === QuestionKind.scale) {
        return `${question.text} You rated it ${answer.value} out of ${question.max}.`
    }

    if (answer.kind === QuestionKind.yesno) {
        return `${question.text} You said "${answer.value ? 'yes' : 'no'}".`
    }

    throw new Error('Unknown kind')
}
