import {
  formatAud,
  medicareLabel,
  privateHealthLabel,
  type FeeItem,
} from '../content/fees';

/**
 * Full-width ruled "tide table" fee schedule.
 * Transforms into stacked labelled rows via CSS container queries on narrow viewports.
 */
export function FeeScheduleTable({
  items,
  captionId = 'fee-schedule-caption',
  captionText = 'Session fees, lengths, Medicare eligibility and private health notes',
}: {
  items: readonly FeeItem[];
  captionId?: string;
  captionText?: string;
}) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-labelledby={captionId}
      className="tide-table-wrap rounded-[var(--radius-ui)] bg-surface px-5 py-4 sm:px-8 sm:py-6"
    >
      <table className="tide-table">
        <caption id={captionId} className="sr-only">
          {captionText}
        </caption>
        <thead>
          <tr>
            <th scope="col">Session</th>
            <th scope="col">Length</th>
            <th scope="col">Fee (AUD)</th>
            <th scope="col">Medicare</th>
            <th scope="col">Private health</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} id={item.id} className="scroll-mt-24">
              <th scope="row" className="font-normal text-ink">
                <span className="block font-display text-xl text-ink">{item.label}</span>
                <span className="mt-1 block max-w-md text-sm text-muted">{item.note}</span>
              </th>
              <td data-label="Length" className="whitespace-nowrap text-ink/90">
                {item.minutes} min
              </td>
              <td data-label="Fee" className="whitespace-nowrap font-display text-2xl text-ink">
                {formatAud(item.price)}
              </td>
              <td data-label="Medicare" className="text-ink/90">
                {medicareLabel(item.medicare)}
              </td>
              <td data-label="Private health" className="text-muted">
                {privateHealthLabel(item.privateHealth)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
