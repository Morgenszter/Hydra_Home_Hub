import Logger from "../core/Logger";

import { AutomationRule } from "./AutomationRule";

import { AutomationScene } from "./AutomationScene";

class AutomationEngine {

  private rules =
    new Map<string, AutomationRule>();

  private scenes =
    new Map<string, AutomationScene>();

  registerRule(
    rule: AutomationRule
  ) {

    this.rules.set(
      rule.id,
      rule
    );

    Logger.info(
      "AUTOMATION",
      `Rule ${rule.name} registered`
    );

  }

  removeRule(
    id: string
  ) {

    this.rules.delete(id);

  }

  registerScene(
    scene: AutomationScene
  ) {

    this.scenes.set(
      scene.id,
      scene
    );

    Logger.info(
      "AUTOMATION",
      `Scene ${scene.name} registered`
    );

  }

  removeScene(
    id: string
  ) {

    this.scenes.delete(id);

  }

  async executeRules() {

    const rules =
      Array.from(
        this.rules.values()
      ).sort(
        (a, b) =>
          b.priority - a.priority
      );

    for (const rule of rules) {

      if (!rule.enabled) {

        continue;

      }

      try {

        if (rule.condition()) {

          await rule.action();

        }

      } catch (error) {

        Logger.error(
          "AUTOMATION",
          `Rule ${rule.name} failed`
        );

      }

    }

  }

  async runScene(
    id: string
  ) {

    const scene =
      this.scenes.get(id);

    if (!scene) {

      return;

    }

    for (const ruleId of scene.rules) {

      const rule =
        this.rules.get(ruleId);

      if (!rule) {

        continue;

      }

      await rule.action();

    }

  }

  getRules() {

    return Array.from(
      this.rules.values()
    );

  }

  getScenes() {

    return Array.from(
      this.scenes.values()
    );

  }

  clear() {

    this.rules.clear();

    this.scenes.clear();

  }

}

const automationEngine =
  new AutomationEngine();

export default automationEngine;