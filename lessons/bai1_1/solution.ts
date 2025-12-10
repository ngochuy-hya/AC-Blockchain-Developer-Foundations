import crypto from "crypto";

export type Block = {
  index: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  current_hash: string;
};

// ✍️ TODO: Viết hàm tại đây
export function isValidBlock(block: Block): boolean {
  // Tinh hash tu block
  const value = block.index + block.timestamp + JSON.stringify(block.transactions) + block.previous_hash;
  const calculatedHash = crypto.createHash('sha256').update(value).digest('hex');
  
  // Ss hash
  return calculatedHash === block.current_hash;
}
