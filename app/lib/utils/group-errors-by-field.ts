import { ApiFieldError } from '@/app/types/api';

export function groupErrorsByField(
  fieldErrors: ApiFieldError[],
): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  for (const { field, message } of fieldErrors) {
    grouped[field] = [...(grouped[field] ?? []), message];
  }

  return grouped;
}
