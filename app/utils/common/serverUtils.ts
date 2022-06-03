import { Buffer } from "buffer";

function Sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function bin2String(array: any) {
  const base64encoded = String.fromCharCode.apply(String, array);
  const response = Buffer.from(base64encoded, "base64").toString();
  return response;
}
function Base64Encode(input: string) {
  return Buffer.from(input, "binary").toString("base64");
}
function Base64Decode(input: string) {
  return Buffer.from(input, "base64").toString();
}

export { Sleep, bin2String, Base64Encode, Base64Decode };
