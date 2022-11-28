import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import FontFamilyDropdown from "components/FontFamilyDropdown"
import BlockFormatDropdown from "components/BlockFormatDropdown"
import ColorPicker from "components/ColorPicker"
import useToolbarStyles from "utils/ToolbarStylesV2"
import ToolBar from "@material-ui/core/Toolbar"
import RedoButton from "components/RedoButton"
import UndoButton from "components/UndoButton"

import useCleanup from "../hooks/useCleanup"

const ToolbarV6 = () => {
  useCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <ToolBar variant="dense" className={toolbarClasses.root}>
      <UndoButton />
      <RedoButton />
      <Divider />
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <BlockFormatDropdown />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <ColorPicker />
    </ToolBar>
  )
}

export default ToolbarV6
