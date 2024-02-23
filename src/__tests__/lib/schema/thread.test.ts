import { beforeEach, describe, expect, it, vi } from 'vitest'

import { listThreadsSchema } from '@/lib/schema/thread'
import { validate } from '@/lib/validation'
import * as mod from '@/lib/get-user-for-api'
import { ZodError } from 'zod'

describe('listThreadsSchema', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })


  it('error', async () => {
    vi.spyOn(mod, 'getUserForApi').mockImplementation(async () => {
      return {
        id: "hoge",
        email: "hoge@hoge.com",
        name: "hoge",
        salary: {
          sr: "hoge",
          value: 100
        }
      }
    })
    const input = {
      prevId: "hoge"
    }
    try {
      const _ = await validate(input, listThreadsSchema)      
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError)
      const err = error as ZodError
      expect(err.errors[0].code).toBe('invalid_type')
      expect(err.errors[0].path[0]).toBe('prevId')
      expect(err.errors[0].message).toBe("Expected number, received string")
    }
  })
})