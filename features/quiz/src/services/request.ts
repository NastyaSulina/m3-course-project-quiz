const BASE_URL = 'http://localhost:3000'

interface RequestOptions<Body = never> {
    path: string
    method?: string
    body?: Body
    headers?: Record<string, string>
}

export async function request<Reply extends object = object, Body = never>({
    path,
    method = 'GET',
    body,
    headers = {},
}: RequestOptions<Body>): Promise<Reply> {
    let response: Response

    try {
        response = await fetch(`${BASE_URL}${path}`, {
            method,
            headers: {
                ...headers,
                ...(body ? { 'content-type': 'application/json' } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        })
    } catch {
        throw new Error(`Cannot reach the server at ${BASE_URL}`)
    }

    if (!response.ok) {
        const errorBody: unknown = await response.json().catch(() => null)

        if (
            typeof errorBody === 'object' &&
            errorBody !== null &&
            'error' in errorBody &&
            typeof errorBody.error === 'string'
        ) {
            throw new Error(errorBody.error)
        }

        throw new Error(`The server answered ${response.status}`)
    }

    const result: unknown = await response.json()

    return result as Reply
}
