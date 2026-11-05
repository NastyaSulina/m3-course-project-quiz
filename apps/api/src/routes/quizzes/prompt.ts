import { QuestionKind, type Prompt, type Question } from '@platform/quiz/game-core'

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
            low: question.low,
            high: question.high,
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
