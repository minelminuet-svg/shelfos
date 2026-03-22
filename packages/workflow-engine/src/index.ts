export type WorkflowTrigger =
  | 'inventory.low_stock'
  | 'purchase_order.created'
  | 'purchase_order.received';

export interface WorkflowDefinition {
  id: string;
  name: string;
  enabled: boolean;
  trigger: WorkflowTrigger;
  condition: Record<string, unknown>;
  action: Record<string, unknown>;
}

export function isWorkflowEnabled(workflow: WorkflowDefinition) {
  return workflow.enabled;
}
