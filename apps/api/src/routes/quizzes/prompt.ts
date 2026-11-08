import { type Prompt, type Question, QuestionKind } from '@platform/quiz/game-core'

export function toPrompt(question: Question): Prompt {
    if (question.kind === QuestionKind.choice) {
        return {
            kind: QuestionKind.choice,
            text: question.text,
            hint: question.hint,
            choices: question.choices.map(({ label }) => ({ label })),
        }
    }

    if (question.kind === QuestionKind.scale) {
        return {
            kind: QuestionKind.scale,
            text: question.text,
            hint: question.hint,
            min_label: question.min_label,
            max_label: question.max_label,
            min: question.min,
            max: question.max,
        }
    }

    if (question.kind === QuestionKind.yesno) {
        return {
            kind: QuestionKind.yesno,
            text: question.text,
            hint: question.hint,
        }
    }

    throw new Error('Unknown kind')
}
