import { OutcomeId, type Answer, type Choice } from './types.ts'

export function isAnswer(value: unknown): value is Answer {
    if (typeof value !== 'object' || value === null || !('kind' in value)) {
        return false
    }

    if (value.kind === 'choice') {
        return 'picked' in value && isChoice(value.picked)
    }

    if (value.kind === 'scale') {
        return (
            'value' in value &&
            typeof value.value === 'number' &&
            value.value >= 0 &&
            value.value <= 2
        )
    }

    if (value.kind === 'yesno') {
        return 'value' in value && typeof value.value === 'boolean'
    }

    return false
}

export function isChoice(value: unknown): value is Choice {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    if (!('label' in value) || typeof value.label !== 'string') {
        return false
    }

    if (
        !('outcome' in value) ||
        !Object.values(OutcomeId).some((outcome) => outcome === value.outcome)
    ) {
        return false
    }

    if (!('points' in value) || typeof value.points !== 'number') {
        return false
    }

    return true
}
