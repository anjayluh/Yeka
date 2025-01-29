
export function formatNumberWithCommas(value: number | string): string {
    if (value === null || value === undefined) return "";
    return Number(value).toLocaleString();
  }
  