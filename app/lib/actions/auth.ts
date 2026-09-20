'use server';

import { redirect } from 'next/navigation';
import { RegisterFormSchema, LoginFormSchema } from '../schemas/auth';
import {
  loginRequest,
  registerRequest,
  AuthApiError,
} from '@/app/lib/api/auth';
import { setAuthCookies } from '@/app/lib/token/auth-token';
import { flattenError } from 'zod';
import { ERROR_MESSAGES } from '@/app/constants/error-messages';
import { groupErrorsByField } from '../utils/group-errors-by-field';

// union type — leading | is optional, just for readability
// this type matches what Zod's formatted error returns
export type LoginFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
      values?: {
        username?: string;
      };
    }
  | undefined;

export type RegisterFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      values?: {
        email?: string;
      };
    }
  | undefined;

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
      values: { username: formData.get('username') as string },
    };
  }

  const { username, password } = validatedFields.data;
  try {
    const { accessToken, refreshToken, expiresIn, refreshExpiresIn } =
      await loginRequest(username, password);

    await setAuthCookies({
      accessToken,
      refreshToken,
      expiresIn,
      refreshExpiresIn,
    });
  } catch (error) {
    const username = formData.get('username') as string;
    if (error instanceof AuthApiError) {
      return {
        message: error.message,
        values: { username },
      };
    }
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      values: { username },
    };
  }

  redirect('/');
}

export async function register(
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
      values: { email: formData.get('email') as string },
    };
  }

  const { email, password } = validatedFields.data;
  try {
    const { accessToken, refreshToken, expiresIn, refreshExpiresIn } =
      await registerRequest(email, password);
    await setAuthCookies({
      accessToken,
      refreshToken,
      expiresIn,
      refreshExpiresIn,
    });
  } catch (error) {
    const email = formData.get('email') as string;

    if (error instanceof AuthApiError) {
      if (error.fieldErrors?.length) {
        return {
          errors: groupErrorsByField(error.fieldErrors),
          values: { email },
        };
      }

      return {
        message: error.message,
        values: { email },
      };
    }

    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      values: { email },
    };
  }

  redirect('/');
}
