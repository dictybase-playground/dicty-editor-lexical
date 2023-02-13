import { createPortal } from "react-dom"
import { useAtomValue } from "jotai"
import {
  selectedTableCellNode,
  tableActionMenuOpenAtom,
} from "context/AtomConfigs"
import usePositionMenuButton from "hooks/usePositionMenuButton"
import TableActionMenuButton from "components/TableActionMenuButton"
import TableActionMenu from "components/TableActionMenu"
import useSelectCurrentCell from "hooks/useSelectCurrentCell"

const TableActionPlugin = () => {
  const currentTableCellNode = useAtomValue(selectedTableCellNode)
  const isMenuOpen = useAtomValue(tableActionMenuOpenAtom)
  const menuButtonReference = usePositionMenuButton()
  useSelectCurrentCell()

  if (currentTableCellNode)
    return (
      <>
        {createPortal(
          <TableActionMenuButton menuButtonReference={menuButtonReference} />,
          document.body,
        )}
        {menuButtonReference.current ? (
          <TableActionMenu
            anchorElement={menuButtonReference.current}
            isMenuOpen={isMenuOpen}
          />
        ) : null}
      </>
    )

  return null
}

export default TableActionPlugin
