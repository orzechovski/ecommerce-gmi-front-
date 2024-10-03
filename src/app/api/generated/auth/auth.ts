/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * E-commerce GMI API
 * API documentation for the E-commerce gmi project
 * OpenAPI spec version: 1.0
 */
import { useMutation } from '@tanstack/react-query'
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'
import type {
  AuthResponseDto,
  LoginAuthDto,
  RegisterAuthDto
} from '../eCommerceGMIAPI.schemas'
import { customInstance } from '../../_mutator/axios-instance'
import type { ErrorType } from '../../_mutator/axios-instance'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * @summary Register a new user
 */
export const authControllerRegister = (
  registerAuthDto: RegisterAuthDto,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/api/auth/register`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: registerAuthDto
    },
    options
  )
}

export const getAuthControllerRegisterMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRegister>>,
    TError,
    { data: RegisterAuthDto },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerRegister>>,
  TError,
  { data: RegisterAuthDto },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerRegister>>,
    { data: RegisterAuthDto }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerRegister(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerRegisterMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerRegister>>
>
export type AuthControllerRegisterMutationBody = RegisterAuthDto
export type AuthControllerRegisterMutationError = ErrorType<void>

/**
 * @summary Register a new user
 */
export const useAuthControllerRegister = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerRegister>>,
    TError,
    { data: RegisterAuthDto },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof authControllerRegister>>,
  TError,
  { data: RegisterAuthDto },
  TContext
> => {
  const mutationOptions = getAuthControllerRegisterMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Login an existing user
 */
export const authControllerLogin = (
  loginAuthDto: LoginAuthDto,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<AuthResponseDto | void>(
    {
      url: `/api/auth/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: loginAuthDto
    },
    options
  )
}

export const getAuthControllerLoginMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: LoginAuthDto },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: LoginAuthDto },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogin>>,
    { data: LoginAuthDto }
  > = (props) => {
    const { data } = props ?? {}

    return authControllerLogin(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type AuthControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogin>>
>
export type AuthControllerLoginMutationBody = LoginAuthDto
export type AuthControllerLoginMutationError = ErrorType<void>

/**
 * @summary Login an existing user
 */
export const useAuthControllerLogin = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: LoginAuthDto },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: LoginAuthDto },
  TContext
> => {
  const mutationOptions = getAuthControllerLoginMutationOptions(options)

  return useMutation(mutationOptions)
}
