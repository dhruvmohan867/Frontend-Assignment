export default async function submit(nodes, edges) {
  const payload = {
    nodes: nodes.map(n => ({ id: n.id })),
    edges: edges.map(e => ({ source: e.source, target: e.target })),
  }

  const resp = await fetch('http://localhost:8000/pipelines/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!resp.ok) throw new Error(`Backend error: ${resp.status}`)
  return resp.json()
}