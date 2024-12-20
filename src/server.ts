import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { examplesRoute } from './routes/examples'

const _PORT = 3333
const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifyCors, { origin: '*' })
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Typed API',
      version: '1.0.0',
    }
  }
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(examplesRoute)

app.listen({ port: _PORT }).then(() => console.log(`Server running on port ${_PORT}`))
