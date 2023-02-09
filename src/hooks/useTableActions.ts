import { $getRoot } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableColumnIndexFromTableCellNode,
  $getTableRowIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableRow,
  $insertTableColumn,
  $removeTableRowAtIndex,
  $deleteTableColumn,
} from "@lexical/table"
import {
  selectedTableCellNode,
  tableActionMenuOpenAtom,
} from "context/AtomConfigs"
import { useAtomValue, useSetAtom } from "jotai"

const useTableActions = () => {
  const [editor] = useLexicalComposerContext()
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const tableCellNode = useAtomValue(selectedTableCellNode)
  let deleteColumnDisabled = true
  let deleteRowDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNode) return
    const grid = $getElementGridForTableNode(
      editor,
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
    )
    deleteColumnDisabled = grid.columns === 1
    deleteRowDisabled = grid.rows === 1
  })

  const clearTableSelection = () => {
    if (tableCellNode && tableCellNode.isAttached()) return
    editor.update(() => {
      const rootNode = $getRoot()
      rootNode.selectStart()
    })
  }

  const deleteTable = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      tableNode.remove()
    })
    setIsOpen(false)
  }

  const insertRowAbove = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      $insertTableRow(
        tableNode,
        $getTableRowIndexFromTableCellNode(tableCellNode),
        false,
        1,
        $getElementGridForTableNode(editor, tableNode),
      )
    })
    setIsOpen(false)
  }

  const insertRowBelow = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      $insertTableRow(
        tableNode,
        $getTableRowIndexFromTableCellNode(tableCellNode),
        true,
        1,
        $getElementGridForTableNode(editor, tableNode),
      )
    })
    setIsOpen(false)
  }

  const insertColumnLeft = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      $insertTableColumn(
        tableNode,
        $getTableColumnIndexFromTableCellNode(tableCellNode),
        false,
        1,
        $getElementGridForTableNode(editor, tableNode),
      )
    })
    setIsOpen(false)
  }

  const insertColumnRight = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      $insertTableColumn(tableNode, columnIndex, true, 1, grid)
    })
    setIsOpen(false)
  }

  const deleteRow = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const rowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)
      $removeTableRowAtIndex(tableNode, rowIndex)
      clearTableSelection()
    })
    setIsOpen(false)
  }

  const deleteColumn = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      $deleteTableColumn(tableNode, columnIndex)
      clearTableSelection()
    })
    setIsOpen(false)
  }

  return {
    insertColumnLeft,
    insertColumnRight,
    insertRowAbove,
    insertRowBelow,
    deleteColumn,
    deleteRow,
    deleteTable,
    deleteColumnDisabled,
    deleteRowDisabled,
  }
}

export default useTableActions
