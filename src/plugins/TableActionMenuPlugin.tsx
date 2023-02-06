import { useEffect, useRef, useState } from "react"
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
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
  $getRoot,
} from "lexical"
import {
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableCellNodeFromLexicalNode,
  $getTableColumnIndexFromTableCellNode,
  $getTableRowIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableRow,
  $insertTableColumn,
  $removeTableRowAtIndex,
  TableCellNode,
} from "@lexical/table"

const useTableMenuButtonStyles = makeStyles({
  root: {
    position: "absolute",
  },
  //   maybe change the hover styles too?
})

const positionMenuButton = (
  menuButtonDOM: HTMLElement | null,
  anchorElement: HTMLElement | null,
) => {
  if (!anchorElement) return
  if (!menuButtonDOM) return

  const menuButtonRectangle = menuButtonDOM.getBoundingClientRect()
  const anchorElementRectangle = anchorElement.getBoundingClientRect()

  // eslint-disable-next-line no-param-reassign
  menuButtonDOM.style.left = `${
    anchorElementRectangle.right - menuButtonRectangle.width + window.scrollX
  }px`
  // eslint-disable-next-line no-param-reassign
  menuButtonDOM.style.top = `${
    anchorElementRectangle.top +
    10 -
    menuButtonRectangle.height / 2 +
    window.scrollY
  }px`
}

const usePositionMenuButton = (anchorElement: HTMLElement | null) => {
  const menuButtonReference = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    positionMenuButton(menuButtonReference.current, anchorElement)
  }, [anchorElement])

  return menuButtonReference
}

type TableMenuButtonProperties = {
  tableCellNode: TableCellNode
}

const TableMenuButton = ({ tableCellNode }: TableMenuButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const tableCellAnchorElement = editor.getElementByKey(tableCellNode.getKey())
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonReference = usePositionMenuButton(tableCellAnchorElement)
  const { root } = useTableMenuButtonStyles()

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
      const rowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)
      $removeTableRowAtIndex(tableNode, rowIndex)
      clearTableSelection()
    })
    setIsOpen(false)
  }

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
        <MenuItem onClick={() => setIsOpen(false)}> Delete Column </MenuItem>
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
    const unregisterSelectionChange = editor.registerCommand(
      // lexical's demo uses registerUpdateListener, maybe that's the right choice, look into later
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection)) return true
        // lexical also has other non-null checks for other variables, that I don't think are necessary, but I will look closer
        const tableCellNode = $getTableCellNodeFromLexicalNode(
          selection.anchor.getNode(),
        )

        if (!tableCellNode) {
          setCurrentTableCellNode(null)
          return false
        }

        setCurrentTableCellNode(tableCellNode)
        return false
      },
      COMMAND_PRIORITY_LOW,
    )

    return () => {
      unregisterSelectionChange()
    }
  }, [editor])

  if (currentTableCellNode)
    return createPortal(
      // maybe a popper or popover mui element here instead
      <TableMenuButton tableCellNode={currentTableCellNode} />,
      document.body,
    )

  return null
}

export default TableActionMenuPlugin
