import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'), // pode ser entre esses
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333) // coerce converte para o tipo que voce quer, nesse caso number
})

const _env = envSchema.safeParse(process.env) // tenta validar o env para ver se tem as informações nele

if (_env.success === false) {
  console.error('Erro ao validar env', _env.error.format()) // pega os erros do processo de validação e formata

  throw new Error('Erro ao validar variaveis de ambiente')
}

export const env = _env.data // tras os dados das variaveis de ambiente