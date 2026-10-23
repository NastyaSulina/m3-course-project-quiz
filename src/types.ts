interface Choice {
    label: string
    points: number
}

export enum QuestionKind {
    choice = 'choice',
    yesno = 'yesno',
    scale = 'scale',
}

interface BaseQuestion {
    text: string
}

interface ChoiceQuestion extends BaseQuestion {
    kind: QuestionKind.choice
    choices: Choice[]
}

interface YesNoQuestion extends BaseQuestion {
    kind: QuestionKind.yesno
}

interface ScaleQuestion extends BaseQuestion {
    kind: QuestionKind.scale
    low: string
    high: string
}

export type Question = ChoiceQuestion | ScaleQuestion | YesNoQuestion

export interface Outcome {
    title: string
    description: string
}

interface ChoiceAnswer {
    kind: QuestionKind.choice
    picked: Choice
}

interface ScaleAnswer {
    kind: QuestionKind.scale
    value: number
}

interface YesNoAnswer {
    kind: QuestionKind.yesno
    value: boolean
}

export type Answer = ChoiceAnswer | ScaleAnswer | YesNoAnswer
