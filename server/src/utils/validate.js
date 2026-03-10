export function zodErrorToMessage(err) {
  const first = err?.issues?.[0];
  if (!first) return 'Invalid input';
  const path = first.path?.length ? `${first.path.join('.')}: ` : '';
  return `${path}${first.message}`;
}

