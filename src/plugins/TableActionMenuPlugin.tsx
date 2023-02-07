import React, { useEffect, useRef, useState } from "react"
import {
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import { createPortal } from "react-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection, $getRoot } from "lexical"
import {
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableCellNodeFromLexicalNode,
  $getTableColumnIndexFromTableCellNode,
  $getTableRowIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableRow,
  $insertTableColumn,
  $removeTableRowAtIndex,
  $deleteTableColumn,
  TableCellNode,
} from "@lexical/table"

const useTableMenuButtonStyles = makeStyles({
  root: {
    position: "absolute",
  },
})

const usePositionMenuButton = (tableCellNode: TableCellNode) => {
  const [editor] = useLexicalComposerContext()
  const menuButtonReference = useRef<HTMLButtonElement>(null)
  const tableCellAnchorElement = editor.getElementByKey(tableCellNode.getKey())
  useEffect(() => {
    const menuButtonDOM = menuButtonReference.current
    if (!tableCellAnchorElement) return
    if (!menuButtonDOM) return

    const menuButtonRectangle = menuButtonDOM.getBoundingClientRect()
    const anchorElementRectangle =
      tableCellAnchorElement.getBoundingClientRect()

    menuButtonDOM.style.left = `${
      anchorElementRectangle.right - menuButtonRectangle.width + window.scrollX
    }px`
    menuButtonDOM.style.top = `${
      anchorElementRectangle.top +
      10 -
      menuButtonRectangle.height / 2 +
      window.scrollY
    }px`
  }, [tableCellNode, tableCellAnchorElement, editor, menuButtonReference])

  return menuButtonReference
}

const useTableControls = (
  tableCellNode: TableCellNode,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [editor] = useLexicalComposerContext()

  const clearTableSelection = () => {
    if (tableCellNode.isAttached()) return
    editor.update(() => {
      const rootNode = $getRoot()
      rootNode.selectStart()
    })
  }

  const deleteTable = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      tableNode.remove()
    })
    setIsOpen(false)
  }

  const insertRow = (insertAfter: boolean) => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const rowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      $insertTableRow(tableNode, rowIndex, insertAfter, 1, grid)
    })
    setIsOpen(false)
  }

  const insertColumn = (insertAfter: boolean) => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      $insertTableColumn(tableNode, columnIndex, insertAfter, 1, grid)
    })
    setIsOpen(false)
  }

  const deleteRow = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      if (grid.rows === 1) {
        tableNode.remove()
        return
      }
      const rowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)
      $removeTableRowAtIndex(tableNode, rowIndex)
      clearTableSelection()
    })
    setIsOpen(false)
  }

  const deleteColumn = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      if (grid.columns === 1) {
        tableNode.remove()
        return
      }

      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      $deleteTableColumn(tableNode, columnIndex)
      clearTableSelection()
    })
    setIsOpen(false)
  }

  return { insertColumn, insertRow, deleteColumn, deleteRow, deleteTable }
}

type TableMenuButtonProperties = {
  tableCellNode: TableCellNode
}

const TableMenuButton = ({ tableCellNode }: TableMenuButtonProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const { root } = useTableMenuButtonStyles()
  const { insertColumn, insertRow, deleteColumn, deleteRow, deleteTable } =
    useTableControls(tableCellNode, setIsOpen)
  const menuButtonReference = usePositionMenuButton(tableCellNode)

  return (
    <>
      <IconButton
        size="small"
        onClick={() => setIsOpen(true)}
        ref={menuButtonReference}
        className={root}>
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        open={isOpen}
        // getContentAnchorEl needs to be set to null for anchorOrigin.vertical to have affect
        getContentAnchorEl={null}
        anchorEl={menuButtonReference.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => setIsOpen(false)}>
        <MenuItem onClick={() => insertRow(false)}>Insert Row Above</MenuItem>
        <MenuItem onClick={() => insertRow(true)}> Insert Row Below</MenuItem>
        <Divider />
        <MenuItem onClick={() => insertColumn(false)}>
          Insert Column Left
        </MenuItem>
        <MenuItem onClick={() => insertColumn(true)}>
          Insert Column Right
        </MenuItem>
        <Divider />
        <MenuItem onClick={deleteRow}> Delete Row </MenuItem>
        <MenuItem onClick={deleteColumn}> Delete Column </MenuItem>
        <MenuItem onClick={deleteTable}> Delete Table </MenuItem>
      </Menu>
    </>
  )
}

const TableActionMenuPlugin = () => {
  const [editor] = useLexicalComposerContext()
  // switch to using atom for this later
  const [currentTableCellNode, setCurrentTableCellNode] =
    useState<TableCellNode | null>(null)

  useEffect(() => {
    // register a listener for selection command,
    // if the selection is inside a table cell, get the current table cell node for that cell
    // and store it in state, which is used by TableMenuButton for positioning
    const unregisterSelectionChange = editor.registerUpdateListener(
      // lexical's demo uses registerUpdateListener, maybe that's the right choice, look into later
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection()

          if (!$isRangeSelection(selection)) return
          // lexical also has other non-null checks for other variables, that I don't think are necessary, but I will look closer
          const tableCellNode = $getTableCellNodeFromLexicalNode(
            selection.anchor.getNode(),
          )

          if (!tableCellNode) {
            setCurrentTableCellNode(null)
            return
          }

          setCurrentTableCellNode(tableCellNode)
        })
      },
    )

    return () => {
      unregisterSelectionChange()
    }
  }, [editor])

  if (currentTableCellNode)
    return createPortal(
      <TableMenuButton tableCellNode={currentTableCellNode} />,
      document.body,
    )

  return null
}

export default TableActionMenuPlugin
