import { pipe, A, F } from "@mobily/ts-belt"
import { $createParagraphNode, $createTextNode } from "lexical"
import {
  TableNode,
  TableRowNode,
  $createTableRowNode,
  $createTableCellNode,
  TableCellHeaderStates,
} from "@lexical/table"
import CustomTableNode from "nodes/CustomTableNode"

const $createCustomTableNodeWithDimensions = (
  rowCount: number,
  columnCount: number,
  width: number,
) => {
  const createParagraphWithTextNode = () =>
    $createParagraphNode().append($createTextNode())

  const createCellWithParagraphNode = () =>
    $createTableCellNode(TableCellHeaderStates.NO_STATUS).append(
      createParagraphWithTextNode(),
    )

  const createHeaderCellWithParagraphNode = () =>
    $createTableCellNode(TableCellHeaderStates.ROW).append(
      createParagraphWithTextNode(),
    )

  const bodyCellsToAppend = (count: number) => (row: TableRowNode) => {
    Array.from({ length: count }).forEach(() =>
      row.append(createCellWithParagraphNode()),
    )
  }

  const headerCellsToAppend = (count: number) => (row: TableRowNode) => {
    Array.from({ length: count }).forEach(() =>
      row.append(createHeaderCellWithParagraphNode()),
    )
  }

  const cellsToAppend = (cells: number) => (rows: TableRowNode[]) => {
    if (rows.length === 0) return
    const headerCellFunction = headerCellsToAppend(cells)
    const bodyCellFunction = bodyCellsToAppend(cells)
    headerCellFunction(rows[0])
    pipe(rows, A.tailOrEmpty, A.tap(bodyCellFunction))
  }

  const createRows = (rows: number) =>
    Array.from({ length: rows }).map(() => $createTableRowNode())

  const rowToAppend = (table: TableNode) => (row: TableRowNode) => {
    table.append(row)
  }

  const tableNode = new CustomTableNode(width)
  const cellFunction = cellsToAppend(columnCount)
  const rowFunction = rowToAppend(tableNode)
  pipe(rowCount, createRows, F.tap(cellFunction), A.tap(rowFunction))
  return tableNode
}

export default $createCustomTableNodeWithDimensions
