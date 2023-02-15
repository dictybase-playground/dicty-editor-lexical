import { LexicalEditor } from "lexical"
import {
  TableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableRow,
} from "@lexical/table"

// eslint-disable-next-line import/prefer-default-export
export const insertRow = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode | null,
  { insertAfter }: { insertAfter: boolean },
) => {
  if (!tableCellNode) return
  editor.update(() => {
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
    const row = $getTableRowIndexFromTableCellNode(tableCellNode)
    const grid = $getElementGridForTableNode(editor, tableNode)
    $insertTableRow(tableNode, row, insertAfter, 1, grid)
  })
}
