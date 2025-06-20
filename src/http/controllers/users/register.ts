import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySDchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = registerBodySDchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      nome,
      email,
      password
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return replay.status(409).send({message: err.message})
    }

    throw err
  }
  return replay.status(201).send
}