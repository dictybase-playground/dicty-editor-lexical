import { Divider, Menu, MenuItem } from "@material-ui/core"
import {
  useInsertRow,
  useInsertColumn,
  useDeleteRow,
  useDeleteColumn,
  useDeleteTable,
} from "hooks/useTableActions"
import { tableActionMenuOpenAtom } from "context/AtomConfigs"
import { useAtom } from "jotai"

type TableActionMenuProperties = {
  anchorElement: HTMLElement
}

const TableActionMenu = ({ anchorElement }: TableActionMenuProperties) => {
  const [isOpen, setIsOpen] = useAtom(tableActionMenuOpenAtom)
  const { insertRowAbove, insertRowBelow } = useInsertRow()
  const { insertColumnLeft, insertColumnRight } = useInsertColumn()
  const { deleteColumn, deleteColumnDisabled } = useDeleteColumn()
  const { deleteRow, deleteRowDisabled } = useDeleteRow()
  const deleteTable = useDeleteTable()

  return (
    <Menu
      open={isOpen}
      // getContentAnchorEl needs to be set to null for anchorOrigin.vertical to have affect
      getContentAnchorEl={null}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={() => setIsOpen(false)}>
      <MenuItem onClick={insertRowAbove}>Insert Row Above</MenuItem>
      <MenuItem onClick={insertRowBelow}> Insert Row Below</MenuItem>
      <Divider />
      <MenuItem onClick={insertColumnLeft}>Insert Column Left</MenuItem>
      <MenuItem onClick={insertColumnRight}>Insert Column Right</MenuItem>
      <Divider />
      <MenuItem onClick={deleteRow} disabled={deleteRowDisabled}>
        Delete Row
      </MenuItem>
      <MenuItem onClick={deleteColumn} disabled={deleteColumnDisabled}>
        Delete Column
      </MenuItem>
      <MenuItem onClick={deleteTable}> Delete Table </MenuItem>
    </Menu>
  )
}

export default TableActionMenu
