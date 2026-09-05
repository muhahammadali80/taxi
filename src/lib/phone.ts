import { parsePhoneNumberFromString } from "libphonenumber-js";

export function parseCustomerPhone(input: string) {
  const parsed = parsePhoneNumberFromString(input.trim(), "ES");
  if (!parsed || !parsed.isValid()) return null;
  return {
    e164: parsed.number,
    display: parsed.formatInternational(),
  };
}
