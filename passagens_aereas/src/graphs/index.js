class Edge {
  constructor(v1, v2, w = 0) {
    this.v1 = v1;
    this.v2 = v2;
    this.w = w;
  }
}

class Graph {
  constructor(v, e) {
    this.v = v;
    this.e = e;
    this.edges = [];
    this.nodes = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
    if (!this.nodes.includes(edge.v1)) {
      this.nodes.push(edge.v1);
    }
    if (!this.nodes.includes(edge.v2)) {
      this.nodes.push(edge.v2);
    }
  }

  getEdge(pos) {
    return this.edges[pos]
  }

  getEdges() {
    return this.edges
  }

  getNodes() {
    return this.nodes
  }

  // get the root of node
  find(subsets, node) {
    let nodeInfo = subsets.get(node);
    if (nodeInfo.parent != node) {
      nodeInfo.parent = this.find(subsets, nodeInfo.parent)
    }

    return nodeInfo.parent;
  }

  // unite the x and y subsets based on rank
  union(subsets, x, y) {
    let xroot = this.find(subsets, x);
    let yroot = this.find(subsets, y);

    if (subsets.get(xroot).rank < subsets.get(yroot).rank) {
      subsets.get(xroot).parent = yroot;
    } else if (subsets.get(xroot).rank > subsets.get(yroot).rank) {
      subsets.get(yroot).parent = xroot;
    } else {
      subsets.get(yroot).parent = xroot;
      subsets.get(xroot).rank++;
    }
  }
}

export default function kruskal(gNodes, gEdges, gFrom, gTo, gWeight) {
  let i = 0, j = 0, cost = 0;
  let subsets = new Map(),
    result = [];

  let returnResult = { edges: [], cost: 0 };

  let graph = new Graph(gNodes, gEdges);

  while (i < gEdges) {
    graph.addEdge(new Edge(gFrom[i], gTo[i], gWeight[i]));
    i++;
  }

  graph.getEdges().sort((edge1, edge2) => {
    if (edge1.w === edge2.w) {
      return 1;
    }

    return edge1.w < edge2.w ? -1 : 1;
  });


  graph.getNodes().forEach(node => {
    subsets.set(node, { parent: node, rank: 0 });
  });

  i = 0;
  while (j < gNodes - 1) {
    let edge = graph.getEdge(i++);
    let root1 = graph.find(subsets, edge.v1);
    let root2 = graph.find(subsets, edge.v2);

    // if the nodes doesn't create a cycle then we add the edge to final subgraph
    if (root1 != root2) {
      result[j++] = edge;
      // update the total weight of the subgraph
      cost += edge.w;
      graph.union(subsets, root1, root2);
    }
  }

  i = 0;
  while (i < j) {
    returnResult.edges.push({ id: result[i].v1 + '-' + result[i].v2, source: result[i].v1, target: result[i].v2, label: result[i++].w });
  }
  returnResult.cost = cost;
  return returnResult;
}