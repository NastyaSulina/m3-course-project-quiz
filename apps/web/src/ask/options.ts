import { type Prompt, QuestionKind, type Submission } from '@platform/quiz/game-core'

export interface Option {
    label: string
    submission: Submission
}

export function optionsFor(prompt: Prompt): Option[] {
    if (prompt.kind === QuestionKind.choice) {
        return prompt.choices.map((choice) => ({
            label: choice.label,
            submission: {
                kind: QuestionKind.choice,
                picked: choice,
            },
        }))
    }

    if (prompt.kind === QuestionKind.scale) {
        return [0, 1, 2].map((value) => ({
            label: String(value),
            submission: {
                kind: QuestionKind.scale,
                value,
            },
        }))
    }

    if (prompt.kind === QuestionKind.yesno) {
        return [
            {
                label: 'Yes',
                submission: { kind: QuestionKind.yesno, value: true },
            },
            {
                label: 'No',
                submission: { kind: QuestionKind.yesno, value: false },
            },
        ]
    }

    throw new Error('Unknown kind')
}
