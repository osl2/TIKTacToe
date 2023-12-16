import dagre from '@dagrejs/dagre'
import type { Edges, Layouts, Nodes } from 'v-network-graph'

const nodeSize = 40

export function layout(nodes: Nodes, edges: Edges, layouts: Layouts) {
  const g = new dagre.graphlib.Graph()
  g.setGraph({
    rankdir: 'TB',
    nodesep: nodeSize * 2,
    edgesep: nodeSize,
    ranksep: nodeSize * 2
  })
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(() => ({}))

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  Object.entries(nodes).forEach(([nodeId, node]) => {
    g.setNode(nodeId, { label: node.name, width: nodeSize, height: nodeSize })
  })

  // Add edges to the graph.
  Object.values(edges).forEach((edge) => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  g.nodes().forEach((nodeId: string) => {
    // update node position
    const x = g.node(nodeId).x
    const y = g.node(nodeId).y
    layouts.nodes[nodeId] = { x, y }
  })
  console.log('layout wurde aufgerufen')
  console.log(Object.entries(nodes).length.toString())
}