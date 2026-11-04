import Fastify from 'fastify'

import session from './routes/session/index.ts'
import quizzes from './routes/quizzes/index.ts'

const fastify = Fastify()

fastify.register(session)
fastify.register(quizzes)

await fastify.listen({ port: 3000 })
