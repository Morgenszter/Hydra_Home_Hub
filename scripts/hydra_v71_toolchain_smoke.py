from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.toolchain.openai_intent_adapter_v71 import HydraOpenAIIntentAdapterV71
from backend.toolchain.knowledge_graph_adapter_v71 import (
    HydraKnowledgeGraphAdapterV71,
    HydraKnowledgeNode,
)

def main():
    intent = HydraOpenAIIntentAdapterV71(enabled=False).parse("OMEGON włącz czerwony alert")
    graph = HydraKnowledgeGraphAdapterV71()
    graph.upsert_node(HydraKnowledgeNode("device:lights", "device", "Lights", {"kind": "tapo"}))
    export = graph.export_graph()

    frontend_files = [
        "src/toolchain/hydraToolchainContracts.ts",
        "src/toolchain/hydraOpenAIIntentAdapter.ts",
        "src/toolchain/hydraDesignTokens.ts",
        "src/toolchain/hydraExternalDataAdapters.ts",
    ]

    result = {
        "intent": intent.__dict__,
        "graphNodes": len(export["nodes"]),
        "frontendFiles": {rel: (ROOT / rel).exists() for rel in frontend_files},
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
