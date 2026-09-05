export const PLUS_FOUR_PASSENGERS = 5;

export function isPlusFourPassengers(count: number) {
  return count >= PLUS_FOUR_PASSENGERS;
}

export function formatPassengerChoice(
  count: number,
  copy: { plusFourPassengers: string },
) {
  if (isPlusFourPassengers(count)) return copy.plusFourPassengers;
  return String(count);
}
