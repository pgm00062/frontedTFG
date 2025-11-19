export interface InvoiceItem {
  id: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  totalHours: number;
  hourlyRate: number;
  timeCost: number;
  projectBudget: number;
  additionalCosts: number;
  description?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  clientTaxId?: string;
  notes?: string;
  paymentTerms?: string;
  paymentMethod?: string;
  projectId: number;
  projectName: string;
  userId: number;
  userName: string;
}

export interface InvoiceCreateData {
  projectId: number;
  issueDate: string;
  dueDate: string;
  hourlyRate: number;
  totalHours: number;
  projectBudget: number;
  additionalCosts?: number;
  taxRate: number;
  currency: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  clientTaxId?: string;
  description?: string;
  notes?: string;
  paymentTerms?: string;
  paymentMethod?: string;
}

export interface InvoicesClientProps {
  initialInvoices: InvoiceItem[];
  projects?: Array<{
    id: number;
    name: string;
  }>;
}

export interface CreateInvoiceModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  projects: Array<{
    id: number;
    name: string;
  }>;
}

export interface InvoiceDetailsModalProps {
  visible: boolean;
  invoice: InvoiceItem | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export interface InvoiceListItemProps {
  invoice: InvoiceItem;
  onClick: (invoice: InvoiceItem) => void;
}
