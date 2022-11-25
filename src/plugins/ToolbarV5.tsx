import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import FontFamilyDropdown from "components/FontFamilyDropdown"
import ColorPicker from "components/ColorPicker"
import useToolbarStyles from "utils/ToolbarStylesV2"
import ToolBar from "@material-ui/core/Toolbar"
import useCleanup from "hooks/useCleanup"
import RedoButton from "components/RedoButton"
import UndoButton from "components/UndoButton"

const ToolbarV5 = () => {
  useCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <ToolBar variant="dense" className={toolbarClasses.root}>
      <UndoButton />
      <RedoButton />
      <Divider />
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <ColorPicker />
    </ToolBar>
  )
}

export default ToolbarV5
