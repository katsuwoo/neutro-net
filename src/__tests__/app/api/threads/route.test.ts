import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from '@/app/api/threads/route'
import { Session } from 'next-auth'
import * as nextAuth from 'next-auth'
import { NextRequest } from 'next/server'
import { NextURL } from 'next/dist/server/web/next-url'


describe('[GET] /api/threads', () => {
  beforeEach(() => {
    vi.mock('next-auth', async (importOriginal) => {
      const mockSession: Session = {
        expires: "hoge",
        user: {
          id: "hoge",
          email: "hoge@hoge.com",
          name: "hoge",
          salary: {
            sr: "hoge",
            value: 100
          }
        }
      }
      return {
        ...await importOriginal<typeof import('next-auth')>(),
        getServerSession: vi.fn(() => mockSession)
      }
    })
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })
  
  it('Unauthorized error with session null', async () => {
    vi.spyOn(nextAuth, 'getServerSession').mockResolvedValue(null)
    const request = new NextRequest('http://localhost:3000/api/threads', {
      method: 'GET',
    })
    const res = await GET(request)
    const body = await res.json()
    expect(res.status).toBe(401)
    expect(body.message).toBe('Unauthorized')
  })
  
  it('Unauthorized error with salary null', async () => {
    vi.spyOn(nextAuth, 'getServerSession').mockResolvedValue({
      expires: "hoge",
      user: {
        id: "hoge",
        email: "hoge@hoge.com",
        name: "hoge",
        salary: null
      }
    })
    const request = new NextRequest('http://localhost:3000/api/threads', {
      method: 'GET',
    })
    const res = await GET(request)
    const body = await res.json()
    expect(res.status).toBe(401)
    expect(body.message).toBe('Unauthorized')
  })
  
  it('Error because prevId is string', async () => {
    const request = new NextRequest(new Request('http://localhost:3000/api/threads?prevId=aaa', {
      method: 'GET',
    }))
    const res = await GET(request)
    const body = await res.json()
    expect(res.status).toBe(400)
    expect(body.message).toBe('Bad Request')
  })
})