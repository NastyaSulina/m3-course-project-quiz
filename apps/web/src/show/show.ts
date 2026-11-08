import type { ResultResponse } from '@platform/quiz/services'

export default function show(
    app: HTMLElement,
    result: ResultResponse,
    onRestart: () => void,
): void {
    const title = document.createElement('h2')
    const description = document.createElement('p')
    const reasonsTitle = document.createElement('h2')
    const reasons = document.createElement('ul')
    const restartButton = document.createElement('button')

    title.className = 'result-title'
    description.className = 'result-description'
    reasonsTitle.className = 'result-reasons-title'
    reasons.className = 'result-reasons'
    restartButton.className = 'quiz-restart-button'

    title.textContent = `You are: ${result.title}`
    description.textContent = result.description
    restartButton.textContent = 'Restart'

    reasonsTitle.textContent = 'You got this because:'

    for (const reason of result.reasons) {
        const item = document.createElement('li')
        item.className = 'result-reason'
        item.textContent = reason
        reasons.append(item)
    }

    function handleClick(): void {
        restartButton.removeEventListener('click', handleClick)
        onRestart()
    }

    restartButton.addEventListener('click', handleClick)

    app.replaceChildren(title, description, reasonsTitle, reasons, restartButton)
}
