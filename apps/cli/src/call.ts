const BASE_URL = 'http://localhost:3000'

export function call(path: string, init?: RequestInit): Promise<void>
export function call<CallResponse>(path: string, init?: RequestInit): Promise<CallResponse>

export async function call<CallResponse>(
    path: string,
    init?: RequestInit,
): Promise<CallResponse | void> {
    let response: Response

    try {
        response = await fetch(`${BASE_URL}${path}`, init)
    } catch {
        throw new Error(`Cannot reach the server at ${BASE_URL}`)
    }

    if (!response.ok) {
        const body: unknown = await response.json().catch(() => null)

        if (
            typeof body === 'object' &&
            body !== null &&
            'error' in body &&
            typeof body.error === 'string'
        ) {
            throw new Error(body.error)
        }

        throw new Error(`The server answered ${response.status}`)
    }

    if (response.status === 204) {
        return
    }

    return response.json() as CallResponse
}
