export type RuleCondition = () => boolean;

export type RuleAction = () => void | Promise<void>;

export interface AutomationRule {

  id: string;

  name: string;

  enabled: boolean;

  priority: number;

  condition: RuleCondition;

  action: RuleAction;

}