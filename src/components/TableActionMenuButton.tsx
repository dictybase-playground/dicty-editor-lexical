import { IconButton } from "@material-ui/core"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import TableActionMenu from "components/TableActionMenu"
import usePositionMenuButton from "hooks/usePositionMenuButton"
import useTableMenuButtonStyles from "hooks/useTableMenuButtonStyles"
import { tableActionMenuOpenAtom } from "context/AtomConfigs"
import { useAtom } from "jotai"

const TableActionMenuButton = () => {
  const [isOpen, setIsOpen] = useAtom(tableActionMenuOpenAtom)
  const { root } = useTableMenuButtonStyles()
  const menuButtonReference = usePositionMenuButton()

  return (
    <>
      <IconButton
        size="small"
        onClick={() => setIsOpen(true)}
        ref={menuButtonReference}
        className={root}>
        <KeyboardArrowDownIcon />
      </IconButton>
      {menuButtonReference.current && isOpen ? (
        <TableActionMenu anchorElement={menuButtonReference.current} />
      ) : null}
    </>
  )
}

export default TableActionMenuButton
