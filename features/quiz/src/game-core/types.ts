export interface Quiz {
    outcomes: Outcome[]
    questions: Question[]
    title: string
}
export interface QuizResponse {
    outcomes: Outcome[]
    prompts: Prompt[]
    title: string
}
export interface Settings {
    name: string
    hints?: boolean
}

export interface Outcome {
    id: string
    title: string
    description: string
}

export interface Choice {
    label: string
    points: number
    outcome: string
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
    outcome: string
}

interface ScaleQuestion extends BaseQuestion {
    kind: QuestionKind.scale
    low: string
    high: string
    outcome: string
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
    answers: Submission[]
    startedAt?: string
}
interface ChoicePrompt extends BaseQuestion {
    kind: QuestionKind.choice
    choices: PromptChoice[]
}

interface ScalePrompt extends BaseQuestion {
    kind: QuestionKind.scale
    low: string
    high: string
}

interface YesNoPrompt extends BaseQuestion {
    kind: QuestionKind.yesno
}

export type Prompt = ChoicePrompt | ScalePrompt | YesNoPrompt

interface ChoiceSubmission {
    kind: QuestionKind.choice
    picked: PromptChoice
}

interface ScaleSubmission {
    kind: QuestionKind.scale
    value: number
}

interface YesNoSubmission {
    kind: QuestionKind.yesno
    value: boolean
}

export type Submission = ChoiceSubmission | ScaleSubmission | YesNoSubmission

export interface PromptChoice {
    label: string
}
