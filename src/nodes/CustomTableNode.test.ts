import { describe, it, expect } from "vitest"
import { createEditor } from "lexical"
import { testConfig } from "components/LexicalTestComposer"
import CustomTableNode, { SerializedCustomTableNode } from "./CustomTableNode"

describe("CustomTableNode", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [CustomTableNode],
  })
  it('implements a method called "getType", that returns string "table"', () => {
    let tableNode
    let nodeType
    testEditor.update(() => {
      tableNode = new CustomTableNode(500)
      nodeType = tableNode.getType()
    })
    expect(nodeType).toEqual("table")
  })
  it("it accepts a width argument of type number that initializes the table node's width node with the given value", () => {
    let tableNode
    let tableWidth
    const width = Math.random() * 500
    testEditor.update(() => {
      tableNode = new CustomTableNode(width)
      tableWidth = tableNode.__width
    })
    expect(tableWidth).toEqual(width)
  })
  it("implements a static clone method that accepts an instance of a CustomTableNode and returns a new CustomTableNode with the same width and key", () => {
    let tableNode
    let tableNodeKey
    let tableNodeClone
    let tableNodeCloneKey
    let tableNodeCloneWidth
    const width = 150
    testEditor.update(() => {
      tableNode = new CustomTableNode(width)
      tableNodeKey = tableNode.getKey()
      tableNodeClone = CustomTableNode.clone(tableNode)
      tableNodeCloneKey = tableNodeClone.getKey()
      tableNodeCloneWidth = tableNodeClone.__width
    })
    expect(tableNodeClone).toBeInstanceOf(CustomTableNode)
    expect(tableNodeCloneWidth).toEqual(width)
    expect(tableNodeCloneKey).toEqual(tableNodeKey)
  })
  it("implements an exportJSON method that returns an object with a width property", () => {
    let tableNode
    let serializedTableNode
    testEditor.update(() => {
      tableNode = new CustomTableNode(150)
      serializedTableNode = tableNode.exportJSON()
    })
    expect(serializedTableNode).toHaveProperty("width")
  })
  it("implements a static importJSON method that takes a serialized custom table node and returns a CustomTableNode instance", () => {
    let tableNode
    let tableNodeWidth
    const width = Math.random() * 500

    const serializedTableNode: SerializedCustomTableNode = {
      children: [],
      direction: null,
      format: "",
      indent: 0,
      type: "table",
      version: 1,
      width,
    }

    testEditor.update(() => {
      tableNode = CustomTableNode.importJSON(serializedTableNode)
      tableNodeWidth = tableNode.__width
    })

    expect(tableNode).toBeInstanceOf(CustomTableNode)
    expect(tableNodeWidth).toEqual(width)
  })
  it("implements a createDOM method that returns an HTMLTableElement", () => {
    let tableNode
    let tableDOM

    testEditor.update(() => {
      tableNode = new CustomTableNode(150)
      tableDOM = tableNode.createDOM(testConfig)
    })

    expect(tableDOM).toBeInstanceOf(HTMLTableElement)
  })
})
