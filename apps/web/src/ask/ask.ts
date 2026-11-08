import { type Prompt, QuestionKind, type Submission } from '@platform/quiz/game-core'

import { optionsFor } from './options.ts'

export default function ask(
    app: HTMLElement,
    prompt: Prompt,
    progress: string,
): Promise<Submission> {
    const options = optionsFor(prompt)

    const progressLabel = document.createElement('p')
    progressLabel.className = 'quiz-progress'
    progressLabel.textContent = progress

    const heading = document.createElement('h2')
    heading.className = 'quiz-question'

    const list = document.createElement('ul')
    list.className = 'quiz-options'

    heading.textContent = prompt.text

    for (const [index, option] of options.entries()) {
        const item = document.createElement('li')
        item.className = 'quiz-option'
        const button = document.createElement('button')
        button.className = 'quiz-option-button'

        button.textContent = option.label
        button.dataset.index = `${index}`

        item.append(button)
        list.append(item)
    }

    app.replaceChildren(progressLabel, heading, list)

    if (prompt.hint) {
        const hint = document.createElement('p')
        hint.className = 'quiz-hint'
        hint.textContent = prompt.hint
        heading.after(hint)
    }

    if (prompt.kind === QuestionKind.scale) {
        list.classList.add('quiz-options--scale')

        const labels = document.createElement('div')
        labels.className = 'quiz-scale-labels'

        const minLabel = document.createElement('span')
        minLabel.textContent = `From ${prompt.min_label}`

        const maxLabel = document.createElement('span')
        maxLabel.textContent = `To ${prompt.max_label}`

        labels.append(minLabel, maxLabel)
        list.after(labels)
    }

    return new Promise((resolve) => {
        function handleClick(event: MouseEvent): void {
            if (!(event.target instanceof HTMLElement)) {
                return
            }

            const button = event.target.closest('button')

            if (!button) {
                return
            }

            const option = options[Number(button.dataset.index)]

            if (!option) {
                return
            }

            list.removeEventListener('click', handleClick)
            resolve(option.submission)
        }

        list.addEventListener('click', handleClick)
    })
}
