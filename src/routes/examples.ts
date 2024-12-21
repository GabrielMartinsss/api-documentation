import { z } from "zod";
import { FastifyTypedInstance } from "../types";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const users: User[] = []

export async function examplesRoute(app: FastifyTypedInstance) {
  app.get("/users", {
    schema: {
      tags: ['users'],
      description: 'LIst users',
      response: {
        200: z.array(z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          age: z.number()
        }))
      }
    }
  }, async () => {
    return users
  })

  app.post('/users', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        age: z.number().int()
      }),
      response: {
        201: z.null().describe('user created')
      }
    }
  }, async (request, reply) => {
    const { name, email, age } = request.body
    users.push({
      id: randomUUID(),
      name,
      email,
      age,
    })

    return reply.status(201).send()
  })
}