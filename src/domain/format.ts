/**
 * Customer-facing date formatting. Fixtures and (later) the API carry ISO
 * 8601 dates; customers must never see "2026-09-22" (Master Spec INV-8:
 * French UI, no technical values) - they see "22 sept. 2026".
 */
export function formatDateFr(
  iso: string,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' },
): string {
  const d = new Date(`${iso.length === 10 ? `${iso}T00:00:00` : iso}`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('fr-FR', options);
}
