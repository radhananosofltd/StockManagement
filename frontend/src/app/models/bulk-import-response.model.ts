export interface BulkImportResponse {
  success: boolean;
  message: string;
  totalRecords: number;
  successfulRecords: number;
  failedRecords: number;
  errors?: string[];
}