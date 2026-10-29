export interface Quiz {
    outcomes: Outcome[]
    questions: Question[]
    title: string
}

export interface Settings {
    name: string
    hints?: boolean
}

export enum OutcomeId {
    underground = 'underground',
    comfort = 'comfort',
    hit = 'hit',
    party = 'party',
}

export interface Outcome {
    id: OutcomeId
    title: string
    description: string
}

export interface Choice {
    label: string
    points: number
    outcome: OutcomeId
}

export enum QuestionKind {
    choice = 'choice',
    yesno = 'yesno',
    scale = 'scale',
}

interface BaseQuestion {
    text: string
    hint?: string
}

interface ChoiceQuestion extends BaseQuestion {
    kind: QuestionKind.choice
    choices: Choice[]
}

interface YesNoQuestion extends BaseQuestion {
    kind: QuestionKind.yesno
    outcome: OutcomeId
}

interface ScaleQuestion extends BaseQuestion {
    kind: QuestionKind.scale
    low: string
    high: string
    outcome: OutcomeId
}

export type Question = ChoiceQuestion | ScaleQuestion | YesNoQuestion

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

export interface SavedGame {
    answers: Answer[]
    startedAt?: string
}
