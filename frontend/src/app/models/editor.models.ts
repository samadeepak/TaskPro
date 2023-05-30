export type Position = { x: number; y: number }

/*
Represents kind of nodes
*/
export type Kind = Readonly<{
    name: string
    inputs: Readonly<Record<string, null>>
    outputs: Readonly<Record<string, null>>
    backgroundColor: string
}>



export type Schema = Record<string, { inputs: string; outputs: string }>

// Represents Inputs of Node 
export type GetInputs<
    S extends Schema,
    K extends keyof S = keyof S> = S[K]["inputs"]

// Represents Outputs of Node 
export type GetOutputs<
    S extends Schema,
    K extends keyof S = keyof S> = S[K]["outputs"]

export interface Node {
    id: string;
    kind: string;
    inputs: Record<string, null | string>;
    outputs: Record<string, string[]>;
    position: Position;
};;

export type Source = {
    id: string;
    output: string;
}

export type Target = {
    id: string
    input: string;
}


export interface Edge {
    id: string;
    source: Source;
    target: Target;
}

export type EditorState = {
    nodes: Record<string, Node>;
    edges: Record<string, Edge>;
}

export enum FocusElement {
    Node = 'node',
    Edge = 'edge',
}

export type Focus = { element: FocusElement; id: string };