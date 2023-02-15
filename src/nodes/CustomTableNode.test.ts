import { describe, test, expect } from "vitest"
import { createEditor, SerializedElementNode } from "lexical"
import { testConfig } from "components/LexicalTestComposer"
import CustomTableNode, { SerializedCustomTableNode } from "./CustomTableNode"

const width = Math.random() * 500

const data: SerializedCustomTableNode = {
  children: [],
  direction: null,
  format: "",
  indent: 0,
  type: "table",
  version: 1,
  width,
}

describe("CustomTableNode", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [CustomTableNode],
  })
  let tableNode

  let nodeType: string

  let tableWidth: number

  let tableNodeKey: string
  let tableNodeClone: CustomTableNode
  let tableNodeCloneKey: string
  let tableNodeCloneWidth: number

  let serializedTableNode: SerializedElementNode

  let importedTableNode: CustomTableNode
  let importedTableNodeWidth: number

  let tableDOM: HTMLTableElement

  testEditor.update(() => {
    tableNode = new CustomTableNode(width)
    nodeType = tableNode.getType()

    tableWidth = tableNode.__width

    tableNodeKey = tableNode.getKey()
    tableNodeClone = CustomTableNode.clone(tableNode)
    tableNodeCloneKey = tableNodeClone.getKey()
    tableNodeCloneWidth = tableNodeClone.__width

    serializedTableNode = tableNode.exportJSON()

    importedTableNode = CustomTableNode.importJSON(data)
    importedTableNodeWidth = importedTableNode.__width

    tableDOM = tableNode.createDOM(testConfig)
  })
  test('implements a method called "getType", that returns string "table"', () => {
    expect(nodeType).toEqual("table")
  })
  test("it accepts a width argument of type number that initializes the table node's width node with the given value", () => {
    expect(tableWidth).toEqual(width)
  })
  test("implements a static clone method that accepts an instance of a CustomTableNode and returns a new CustomTableNode with the same width and key", () => {
    expect(tableNodeClone).toBeInstanceOf(CustomTableNode)
    expect(tableNodeCloneWidth).toEqual(width)
    expect(tableNodeCloneKey).toEqual(tableNodeKey)
  })
  test("implements an exportJSON method that returns an object with a width property", () => {
    expect(serializedTableNode).toHaveProperty("width")
  })
  test("implements a static importJSON method that takes a serialized custom table node and returns a CustomTableNode instance", () => {
    expect(importedTableNode).toBeInstanceOf(CustomTableNode)
    expect(importedTableNodeWidth).toEqual(width)
  })
  test("implements a createDOM method that returns an HTMLTableElement", () => {
    expect(tableDOM).toBeInstanceOf(HTMLTableElement)
  })
})
