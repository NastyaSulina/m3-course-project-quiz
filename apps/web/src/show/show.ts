import type { ResultResponse } from '@platform/quiz/services'

export default function show(app: HTMLElement, result: ResultResponse): void {
    const title = document.createElement('h2')
    const description = document.createElement('p')
    const reasonsTitle = document.createElement('h2')
    const reasons = document.createElement('ul')

    title.textContent = `You are: ${result.title}`
    description.textContent = result.description

    reasonsTitle.textContent = 'You got this because:'

    for (const reason of result.reasons) {
        const item = document.createElement('li')
        item.textContent = reason
        reasons.append(item)
    }

    app.replaceChildren(title, description, reasonsTitle, reasons)
}
