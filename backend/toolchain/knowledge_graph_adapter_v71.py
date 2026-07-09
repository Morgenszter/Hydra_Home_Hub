from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Any


@dataclass
class HydraKnowledgeNode:
    node_id: str
    kind: str
    label: str
    properties: dict[str, Any]


@dataclass
class HydraKnowledgeEdge:
    source: str
    target: str
    relation: str
    properties: dict[str, Any]


class HydraKnowledgeGraphAdapterV71:
    """
    Adapter boundary for Ace Knowledge Graph / Acumen style tools.
    Keeps HYDRA local-first while allowing future graph export/import.
    """

    def __init__(self):
        self.nodes: dict[str, HydraKnowledgeNode] = {}
        self.edges: list[HydraKnowledgeEdge] = []

    def upsert_node(self, node: HydraKnowledgeNode) -> dict:
        self.nodes[node.node_id] = node
        return asdict(node)

    def connect(self, edge: HydraKnowledgeEdge) -> dict:
        self.edges.append(edge)
        return asdict(edge)

    def export_graph(self) -> dict:
        return {
            "nodes": [asdict(node) for node in self.nodes.values()],
            "edges": [asdict(edge) for edge in self.edges],
        }
