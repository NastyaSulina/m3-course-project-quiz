import cors from '@fastify/cors'
import Fastify from 'fastify'

import quizzes from './routes/quizzes/index.ts'
import session from './routes/session/index.ts'

const fastify = Fastify()

fastify.register(cors)
fastify.register(session)
fastify.register(quizzes)

await fastify.listen({ port: 3000 })
