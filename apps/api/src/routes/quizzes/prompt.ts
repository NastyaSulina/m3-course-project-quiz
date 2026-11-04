import { QuestionKind, type Prompt, type Question } from '@platform/quiz/game-core'

export function toPrompt(question: Question): Prompt {
    if (question.kind === QuestionKind.choice) {
        return {
            kind: 'choice',
            text: question.text,
            hint: question.hint,
            choices: question.choices.map(({ label }) => ({ label })),
        }
    }

    if (question.kind === QuestionKind.scale) {
        return {
            kind: 'scale',
            text: question.text,
            hint: question.hint,
            low: question.low,
            high: question.high,
        }
    }

    if (question.kind === QuestionKind.yesno) {
        return {
            kind: 'yesno',
            text: question.text,
            hint: question.hint,
        }
    }

    throw new Error('Unknown kind')
}
