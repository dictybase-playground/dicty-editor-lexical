import { $getSelection, $isRangeSelection, $createParagraphNode } from "lexical"
import $createWidthTable from "utils/$createWidthTable"

type InsertCustomTablePayload = {
  columns: number
  rows: number
  width: number
}

const InsertCustomTable = ({
  columns,
  rows,
  width,
}: InsertCustomTablePayload) => {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) return true

  const { focus } = selection
  const focusNode = focus.getNode()

  if (!focusNode) return true

  const tableNode = $createWidthTable(rows, columns, width)

  const topLevelNode = focusNode.getTopLevelElementOrThrow()
  topLevelNode.insertAfter(tableNode)

  tableNode.insertAfter($createParagraphNode())

  const firstCell = tableNode.getFirstChildOrThrow().getFirstChildOrThrow()
  firstCell.select()

  return true
}

export default InsertCustomTable
