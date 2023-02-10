import { describe, it, expect } from "vitest"
import { createEditor, ParagraphNode, TextNode } from "lexical"
import { testConfig } from "components/LexicalTestComposer"
import $createWidthTable, {
  createParagraphWithTextNode,
  createCellWithParagraphNode,
  createHeaderCellWithParagraphNode,
  bodyCellsToAppend,
  headerCellsToAppend,
  cellsToAppend,
} from "utils/$createWidthTable"
import {
  TableCellNode,
  TableRowNode,
  TableCellHeaderStates,
  $createTableRowNode,
} from "@lexical/table"
import CustomTableNode from "nodes/CustomTableNode"

describe("CreateParagraphWithTextNode", () => {
  const testEditor = createEditor(testConfig)

  it("creates and returns a paragraph node", () => {
    let paragraphNode
    testEditor.update(() => {
      paragraphNode = createParagraphWithTextNode()
    })
    expect(paragraphNode).toBeInstanceOf(ParagraphNode)
  })

  it("it returns a paragraph node with a Text Node as an immediate child", () => {
    let paragraphNode
    let textNode
    testEditor.update(() => {
      paragraphNode = createParagraphWithTextNode()
      textNode = paragraphNode.getFirstChild()
    })
    expect(textNode).toBeInstanceOf(TextNode)
  })
})

describe("createCellWithParagraphNode", () => {
  const testEditor = createEditor({ ...testConfig, nodes: [TableCellNode] })

  it("returns a table cell node", () => {
    let tableCellNode
    testEditor.update(() => {
      tableCellNode = createCellWithParagraphNode()
    })
    expect(tableCellNode).toBeInstanceOf(TableCellNode)
  })

  it("returns a table cell node with a paragraph node as an immediate child", () => {
    let tableCellNode
    let paragraphNode
    testEditor.update(() => {
      tableCellNode = createCellWithParagraphNode()
      paragraphNode = tableCellNode.getFirstChild()
    })
    expect(paragraphNode).toBeInstanceOf(ParagraphNode)
  })

  it("returns a table cell node that is not a header cell", () => {
    let headerState
    testEditor.update(() => {
      headerState = createCellWithParagraphNode().getHeaderStyles()
    })
    expect(headerState).toEqual(TableCellHeaderStates.NO_STATUS)
  })
})

describe("createHeaderCellWithParagraphNode", () => {
  const testEditor = createEditor({ ...testConfig, nodes: [TableCellNode] })

  it("returns a table cell node", () => {
    let tableCellNode
    testEditor.update(() => {
      tableCellNode = createHeaderCellWithParagraphNode()
    })
    expect(tableCellNode).toBeInstanceOf(TableCellNode)
  })

  it("returns a table cell node with a paragraph node as an immediate child", () => {
    let tableCellNode
    let paragraphNode
    testEditor.update(() => {
      tableCellNode = createHeaderCellWithParagraphNode()
      paragraphNode = tableCellNode.getFirstChild()
    })
    expect(paragraphNode).toBeInstanceOf(ParagraphNode)
  })

  it("returns a table cell node that is a header cell", () => {
    let headerState
    testEditor.update(() => {
      headerState = createHeaderCellWithParagraphNode().getHeaderStyles()
    })
    expect(headerState).toEqual(TableCellHeaderStates.ROW)
  })
})

describe("bodyCellsToAppend", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [TableCellNode, TableRowNode],
  })

  it("returns a function that, when called, appends a specified number of body cells to a table row ", () => {
    const cellCount = Math.floor(Math.random() * 10)

    let tableRow
    let cellsInRow
    let firstCell
    let firstCellHeaderState
    const appendNCellsFunction = bodyCellsToAppend(cellCount)

    testEditor.update(() => {
      tableRow = new TableRowNode()
      appendNCellsFunction(tableRow)
      cellsInRow = tableRow.getChildrenSize()
      firstCell = tableRow.getFirstChild()
      firstCellHeaderState = firstCell ? firstCell.getHeaderStyles() : null
    })

    expect(firstCell).toBeInstanceOf(TableCellNode)
    expect(firstCellHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(cellsInRow).toEqual(cellCount)
  })
})

describe("headerCellsToAppend", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [TableCellNode, TableRowNode],
  })

  it("returns a function that, when called, appends a specified number of header cells to a table row ", () => {
    const cellCount = Math.floor(Math.random() * 10)
    let tableRow
    let cellsInRow
    let firstCell
    let firstCellHeaderState
    const appendNCellsFunction = headerCellsToAppend(cellCount)

    testEditor.update(() => {
      tableRow = new TableRowNode()
      appendNCellsFunction(tableRow)
      cellsInRow = tableRow.getChildrenSize()
      firstCell = tableRow.getFirstChild()
      firstCellHeaderState = firstCell ? firstCell.getHeaderStyles() : null
    })

    expect(firstCell).toBeInstanceOf(TableCellNode)
    expect(firstCellHeaderState).toEqual(TableCellHeaderStates.ROW)
    expect(cellsInRow).toEqual(cellCount)
  })
})

describe("cellsToAppend", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [TableCellNode, TableRowNode],
  })
  const cellCount = 2
  const appendThreeCellsToEachRow = cellsToAppend(cellCount)

  it("returns a function that, when passed an array of table rows, appends header cells to the first row", () => {
    let rowArray
    let firstRowChildren
    let firstCell
    let firstCellHeaderState
    let secondCell
    let secondCellHeaderState
    testEditor.update(() => {
      rowArray = Array.from({ length: 2 }).map(() => $createTableRowNode())
      appendThreeCellsToEachRow(rowArray)
      firstRowChildren = rowArray[0].getChildren()
      ;[firstCell, secondCell] = firstRowChildren
      firstCellHeaderState = firstCell.getHeaderStyles()
      secondCellHeaderState = secondCell.getHeaderStyles()
    })
    expect(firstRowChildren).toHaveLength(cellCount)
    expect(firstCell).toBeInstanceOf(TableCellNode)
    expect(secondCell).toBeInstanceOf(TableCellNode)
    expect(firstCellHeaderState).toEqual(TableCellHeaderStates.ROW)
    expect(secondCellHeaderState).toEqual(TableCellHeaderStates.ROW)
  })
  it("returns a function that, when passed an array of table rows, appends body cells to subsequent rows", () => {
    let rowArray
    let secondRowChildren
    let firstCell
    let firstCellHeaderState
    let secondCell
    let secondCellHeaderState
    testEditor.update(() => {
      rowArray = Array.from({ length: 2 }).map(() => $createTableRowNode())
      appendThreeCellsToEachRow(rowArray)
      secondRowChildren = rowArray[1].getChildren()
      ;[firstCell, secondCell] = secondRowChildren
      firstCellHeaderState = firstCell.getHeaderStyles()
      secondCellHeaderState = secondCell.getHeaderStyles()
    })
    expect(secondRowChildren).toHaveLength(cellCount)
    expect(firstCell).toBeInstanceOf(TableCellNode)
    expect(secondCell).toBeInstanceOf(TableCellNode)
    expect(firstCellHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(secondCellHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
  })
})

describe("createWidthTable", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [TableCellNode, TableRowNode],
  })
  const rowCount = Math.floor(Math.random() * 10)
  const columnCount = Math.floor(Math.random() * 10)
  const width = 500

  it("returns a tableNode", () => {
    let tableNode
    testEditor.update(() => {
      tableNode = $createWidthTable(rowCount, columnCount, width)
    })
    expect(tableNode).toBeInstanceOf(CustomTableNode)
  })

  it("returns a tableNode", () => {
    let tableNode
    testEditor.update(() => {
      tableNode = $createWidthTable(rowCount, columnCount, width)
    })
    expect(tableNode).toBeInstanceOf(CustomTableNode)
  })
})
