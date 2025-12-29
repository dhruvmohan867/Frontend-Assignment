from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from collections import deque
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
origins = [o.rstrip("/") for o in origins_env.split(",") if o.strip()]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",  # allow Vercel previews
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "Backend is running"}

# ----- Models -----
class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# ----- Helpers -----
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    ids = {n.id for n in nodes}
    indeg: Dict[str, int] = {nid: 0 for nid in ids}
    adj: Dict[str, List[str]] = {nid: [] for nid in ids}

    for e in edges:
        if e.source in ids and e.target in ids:
            adj[e.source].append(e.target)
            indeg[e.target] += 1

    q = deque([nid for nid, d in indeg.items() if d == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

    return visited == len(ids)

# ----- Route -----
@app.post("/pipelines/parse")
def parse_pipeline(payload: Pipeline):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag = is_dag(payload.nodes, payload.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}