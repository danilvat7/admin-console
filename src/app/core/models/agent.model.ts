export interface IAgent {
  approvalRequestDaysLimit?: number;
  creationDate?: number;
  email?: string;
  feedbackDaysLimit?: number;
  firstName?: string;
  hash?: string;
  id?: number | string;
  lastModified?: number;
  lastName?: string;
  mlsAgentId?: number | string;
  mlsId?: string;
  notificationType?: string[];
  originId?: number | string;
  showingDaysLimit?: number;
  status?: string;
  syncShowings?: boolean;
  phone?: string;
}

