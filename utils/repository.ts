/* eslint-disable require-await */
import type { NitroFetchRequest, $Fetch } from 'nitropack'
type User = {};

/**
 * Auth Service
 */
export const authService = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async post (body: any): Promise<User[]> {
    return fetch<User[]>('/auth/login', { method: 'POST', body })
  }
})

/**
 * Product Service
 */

export const productService = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async post (body: { title: string; price: number; description: string; image: string; category: string; }): Promise<User[]> {
    return fetch<User[]>('/todos', { method: 'POST', body })
  }
})

/**
 * Todo Service
 */
export const todoService = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get (): Promise<User[]> {
    return fetch<User[]>('/todos')
  },
  async getById ({ id }: { id: any }): Promise<User[]> {
    return fetch<User[]>('/todos' + '/' + id)
  }
})

/**
 * Users Service
 */
export const userService = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get (): Promise<User[]> {
    return fetch<User[]>('/users')
  },
  async getById ({ id }:{id:any}): Promise<User[]> {
    return fetch<User[]>('/users' + '/' + id)
  }
})
