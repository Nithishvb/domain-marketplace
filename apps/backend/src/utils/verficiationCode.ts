import { randomBytes, createHash } from "crypto";

export function generateRandomSHA256Hash() {
  const randomData = randomBytes(32);

  const hash = createHash("sha256").update(randomData).digest("hex");

  const dnsVerificationCode = `marketplace-verification-${hash.substring(0, 35)}`;

  return dnsVerificationCode;
}
