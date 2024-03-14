import type { NitrofetchRequest, $Fetch } from "nitropack";
type User = {};

/**
 * Auth Service
 */
export const authService = <T>(fetch: $Fetch<T, NitrofetchRequest>) => ({
  async post(body): Promise<User[]> {
    return fetch<User[]>("/auth/login", { method: "POST", body });
  },
});

/**
 * Product Service
 */

export const productService = <T>(fetch: $Fetch<T, NitrofetchRequest>) => ({
  async post(body): Promise<User[]> {
    return fetch<User[]>("/todos", { method: "POST", body });
  },
});

/**
 * Todo Service
 */
export const todoService = <T>(fetch: $Fetch<T, NitrofetchRequest>) => ({
  async get(): Promise<User[]> {
    return fetch<User[]>("/todos");
  },
  async getById({ id }): Promise<User[]> {
    return fetch<User[]>("/todos" + "/" + id);
  },
});
