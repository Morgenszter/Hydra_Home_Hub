from __future__ import annotations

from dataclasses import asdict
from fastapi import APIRouter
from pydantic import BaseModel

from backend.toolchain.openai_intent_adapter_v71 import HydraOpenAIIntentAdapterV71
from backend.toolchain.knowledge_graph_adapter_v71 import (
    HydraKnowledgeEdge,
    HydraKnowledgeGraphAdapterV71,
    HydraKnowledgeNode,
)

router = APIRouter(prefix="/toolchain", tags=["toolchain"])
intent_adapter = HydraOpenAIIntentAdapterV71(enabled=False)
knowledge_graph = HydraKnowledgeGraphAdapterV71()


class IntentRequest(BaseModel):
    text: str
    locale: str = "pl-PL"
    context: dict = {}


class KnowledgeNodeRequest(BaseModel):
    nodeId: str
    kind: str
    label: str
    properties: dict = {}


class KnowledgeEdgeRequest(BaseModel):
    source: str
    target: str
    relation: str
    properties: dict = {}


@router.get("/status")
async def toolchain_status():
    return {
        "ok": True,
        "version": "7.1.0",
        "providers": [
            "GitHub",
            "TypeScript",
            "React Native",
            "Convex",
            "OpenAI Platform",
            "Figma",
            "Airtable",
            "Ace Knowledge Graph",
            "Acumen",
            "Photoshop/Canva/Adobe Express/Apixel",
            "Replit",
            "Lovable",
            "Base44",
            "AI Voice Generator",
        ],
    }


@router.post("/intent/parse")
async def parse_intent(body: IntentRequest):
    return asdict(intent_adapter.parse(body.text, body.locale, body.context))


@router.post("/knowledge/node")
async def upsert_node(body: KnowledgeNodeRequest):
    return knowledge_graph.upsert_node(HydraKnowledgeNode(body.nodeId, body.kind, body.label, body.properties))


@router.post("/knowledge/edge")
async def connect_edge(body: KnowledgeEdgeRequest):
    return knowledge_graph.connect(HydraKnowledgeEdge(body.source, body.target, body.relation, body.properties))


@router.get("/knowledge/export")
async def export_graph():
    return knowledge_graph.export_graph()
