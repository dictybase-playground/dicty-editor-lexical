import { $getRoot, LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  TableCellNode,
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

const clearTableSelection = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode,
) => {
  if (tableCellNode && tableCellNode.isAttached()) return
  editor.update(() => {
    const rootNode = $getRoot()
    rootNode.selectStart()
  })
}

export const useDeleteTable = () => {
  const [editor] = useLexicalComposerContext()
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const tableCellNode = useAtomValue(selectedTableCellNode)
  return () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      tableNode.remove()
    })
    setIsOpen(false)
  }
}

export const useInsertRow = () => {
  const [editor] = useLexicalComposerContext()
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const tableCellNode = useAtomValue(selectedTableCellNode)

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

  return { insertRowAbove, insertRowBelow }
}

export const useInsertColumn = () => {
  const [editor] = useLexicalComposerContext()
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const tableCellNode = useAtomValue(selectedTableCellNode)

  const insertColumnLeft = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const column = $getTableColumnIndexFromTableCellNode(tableCellNode)
      $insertTableColumn(
        tableNode,
        column,
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

  return { insertColumnLeft, insertColumnRight }
}
export const useDeleteColumn = () => {
  const [editor] = useLexicalComposerContext()
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const tableCellNode = useAtomValue(selectedTableCellNode)
  let deleteColumnDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNode) return
    const grid = $getElementGridForTableNode(
      editor,
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
    )
    deleteColumnDisabled = grid.columns === 1
  })

  const deleteColumn = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      $deleteTableColumn(tableNode, columnIndex)
      clearTableSelection(editor, tableCellNode)
    })
    setIsOpen(false)
  }

  return {
    deleteColumn,
    deleteColumnDisabled,
  }
}

export const useDeleteRow = () => {
  const [editor] = useLexicalComposerContext()
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const tableCellNode = useAtomValue(selectedTableCellNode)
  let deleteRowDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNode) return
    const grid = $getElementGridForTableNode(
      editor,
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
    )
    deleteRowDisabled = grid.rows === 1
  })

  const deleteRow = () => {
    editor.update(() => {
      if (!tableCellNode) return
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const rowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)
      $removeTableRowAtIndex(tableNode, rowIndex)
      clearTableSelection(editor, tableCellNode)
    })
    setIsOpen(false)
  }

  return {
    deleteRow,
    deleteRowDisabled,
  }
}
