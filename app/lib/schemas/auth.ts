import * as z from 'zod';

export const LoginFormSchema = z.object({
  username: z.string().min(1, 'Please enter a valid email address.').trim(),
  password: z.string().min(1, 'Please enter your password.'),
});

export const RegisterFormSchema = z.object({
  email: z.email('Please enter a valid email address.').trim(),
  password: z
    .string()
    .min(8, 'Password must be 8-32 characters long.')
    .max(32, 'Password must be 8-32 characters long.')
    .regex(
      /^(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9@$!%*?&]{8,32}$/,
      'Password must contain at least one lowercase letter and one number.',
    ),
});
