export interface IAgent {
  id?: number | string;
  creationDate?: number;
  lastModified?: number;
  mlsAgentId?: number | string;
  hash?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notificationType?: string[];
  mlsId?: string;
  syncShowings?: boolean;
  showingDaysLimit?: number;
  feedbackDaysLimit?: number;
  approvalRequestDaysLimit?: number;
  status?: string;
  hasUserAccount: boolean;
  originId?: number | string;
}

