import { describe, test, expect, afterEach } from "vitest"
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

const testEditor = createEditor({
  ...testConfig,
  nodes: [TableCellNode, TableRowNode],
})

const initialEditorStateString =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

afterEach(() => {
  const initialEditorState = testEditor.parseEditorState(
    initialEditorStateString,
  )
  testEditor.setEditorState(initialEditorState)
})

describe("CreateParagraphWithTextNode", () => {
  let paragraphNode: ParagraphNode
  let textNode: TextNode | null
  testEditor.update(() => {
    paragraphNode = createParagraphWithTextNode()
    textNode = paragraphNode.getFirstChild()
  })

  test("creates and returns a paragraph node", () => {
    expect(paragraphNode).toBeInstanceOf(ParagraphNode)
  })
  test("it returns a paragraph node with a Text Node as an immediate child", () => {
    expect(textNode).toBeInstanceOf(TextNode)
  })
})

describe("createCellWithParagraphNode & createHeaderCellwithParagraphNode", () => {
  let bodyCellNode: TableCellNode
  let headerCellNode: TableCellNode
  let bodyCellParagraphNode: ParagraphNode | null
  let headerCellParagraphNode: ParagraphNode | null
  let bodyCellHeaderState: number
  let headerCellHeaderState: number
  testEditor.update(() => {
    bodyCellNode = createCellWithParagraphNode()
    bodyCellParagraphNode = bodyCellNode.getFirstChild()
    bodyCellHeaderState = createCellWithParagraphNode().getHeaderStyles()
    headerCellNode = createHeaderCellWithParagraphNode()
    headerCellParagraphNode = headerCellNode.getFirstChild()
    headerCellHeaderState =
      createHeaderCellWithParagraphNode().getHeaderStyles()
  })
  test("returns a table cell node", () => {
    expect(bodyCellNode).toBeInstanceOf(TableCellNode)
    expect(headerCellNode).toBeInstanceOf(TableCellNode)
  })

  test("returns a table cell node with a paragraph node as an immediate child", () => {
    expect(bodyCellParagraphNode).toBeInstanceOf(ParagraphNode)
    expect(headerCellParagraphNode).toBeInstanceOf(ParagraphNode)
  })

  test("returns a table cell node with the appropriate header state", () => {
    expect(bodyCellHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(headerCellHeaderState).toEqual(TableCellHeaderStates.ROW)
  })
})

describe("bodyCellsToAppend & headerCellsToAppend", () => {
  const cellCount = Math.floor(Math.random() * 10)

  let tableBodyRow: TableRowNode
  let bodyCellsInRow: number
  let firstBodyCell: TableCellNode | null
  let firstBodyCellHeaderState: number | null
  const appendNBodyCellsFunction = bodyCellsToAppend(cellCount)

  let tableHeaderRow: TableRowNode
  let headerCellsInRow: number
  let firstHeaderCell: TableCellNode | null
  let firstHeaderCellHeaderState: number | null
  const appendNHeaderCellsFunction = headerCellsToAppend(cellCount)

  testEditor.update(() => {
    tableBodyRow = new TableRowNode()
    appendNBodyCellsFunction(tableBodyRow)
    bodyCellsInRow = tableBodyRow.getChildrenSize()
    firstBodyCell = tableBodyRow.getFirstChild()
    firstBodyCellHeaderState = firstBodyCell
      ? firstBodyCell.getHeaderStyles()
      : null

    tableHeaderRow = new TableRowNode()
    appendNHeaderCellsFunction(tableHeaderRow)
    headerCellsInRow = tableHeaderRow.getChildrenSize()
    firstHeaderCell = tableHeaderRow.getFirstChild()
    firstHeaderCellHeaderState = firstHeaderCell
      ? firstHeaderCell.getHeaderStyles()
      : null
  })
  test("returns a function that, when called, appends a specified number of body cells to a table row ", () => {
    expect(firstBodyCell).toBeInstanceOf(TableCellNode)
    expect(firstBodyCellHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(bodyCellsInRow).toEqual(cellCount)

    expect(firstHeaderCell).toBeInstanceOf(TableCellNode)
    expect(firstHeaderCellHeaderState).toEqual(TableCellHeaderStates.ROW)
    expect(headerCellsInRow).toEqual(cellCount)
  })
})

describe("cellsToAppend & headerCellsToAppend", () => {
  const cellCount = 2
  const appendThreeCellsToEachRow = cellsToAppend(cellCount)
  let rowArray
  let firstRowChildren: TableCellNode[]
  let firstCellRowOne: TableCellNode
  let secondCellRowOne: TableCellNode
  let firstCellRowOneHeaderState: number
  let secondCellRowOneHeaderState: number

  let secondRowChildren: TableCellNode[]
  let firstCellRowTwo: TableCellNode
  let secondCellRowTwo: TableCellNode
  let firstCellRowTwoHeaderState: number
  let secondCellRowTwoHeaderState: number

  testEditor.update(() => {
    rowArray = Array.from({ length: 2 }).map(() => $createTableRowNode())
    appendThreeCellsToEachRow(rowArray)
    firstRowChildren = rowArray[0].getChildren()
    ;[firstCellRowOne, secondCellRowOne] = firstRowChildren
    firstCellRowOneHeaderState = firstCellRowOne.getHeaderStyles()
    secondCellRowOneHeaderState = secondCellRowOne.getHeaderStyles()

    secondRowChildren = rowArray[1].getChildren()
    ;[firstCellRowTwo, secondCellRowTwo] = secondRowChildren
    firstCellRowTwoHeaderState = firstCellRowTwo.getHeaderStyles()
    secondCellRowTwoHeaderState = secondCellRowTwo.getHeaderStyles()
  })

  test("returns a function that, when passed an array of table rows, appends a given number of schildren to each row", () => {
    expect(firstRowChildren).toHaveLength(cellCount)
    expect(secondRowChildren).toHaveLength(cellCount)
  })
  test("the appended children of the rows are TableCellNodes", () => {
    expect(firstCellRowTwo).toBeInstanceOf(TableCellNode)
    expect(secondCellRowTwo).toBeInstanceOf(TableCellNode)
    expect(firstCellRowOne).toBeInstanceOf(TableCellNode)
    expect(secondCellRowOne).toBeInstanceOf(TableCellNode)
  })
  test("appends header cells to the first row, and body cells to subsequent rows", () => {
    expect(firstCellRowOneHeaderState).toEqual(TableCellHeaderStates.ROW)
    expect(secondCellRowOneHeaderState).toEqual(TableCellHeaderStates.ROW)

    expect(firstCellRowTwoHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(secondCellRowTwoHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
  })
})

describe("createWidthTable", () => {
  const rowCount = Math.floor(Math.random() * 10)
  const columnCount = Math.floor(Math.random() * 10)
  const width = 500
  let tableNode: CustomTableNode
  let numberOfRows: number
  let numberOfColumns: number

  testEditor.update(() => {
    tableNode = $createWidthTable(rowCount, columnCount, width)
    const rowNode = tableNode.getFirstChild() as TableRowNode
    numberOfRows = tableNode.getChildrenSize()
    numberOfColumns = rowNode.getChildrenSize()
  })

  test("returns a tableNode", () => {
    expect(tableNode).toBeInstanceOf(CustomTableNode)
  })
  test("the tableNode has a width property of 500", () => {
    expect(tableNode.__width).toEqual(width)
  })
  test("the tableNode has the given number of rows", () => {
    expect(numberOfRows).toEqual(rowCount)
  })
  test("the tableNode has the given number of columns", () => {
    expect(numberOfColumns).toEqual(columnCount)
  })
})
