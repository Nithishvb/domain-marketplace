import dns from "dns/promises";

export const verifyDNSOwnership = async (
  domain: string,
  expectedCode: string
): Promise<boolean> => {
  try {
    const txtRecords = await dns.resolveTxt(domain);
    const flattenedRecords = txtRecords.flat();
    return flattenedRecords.includes(expectedCode);
  } catch (error) {
    return false;
  }
};
