import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import FontFamilyDropdown from "components/FontFamilyDropdown"
import RedoButton from "components/RedoButton"
import UndoButton from "components/UndoButton"
import ColorPicker from "components/ColorPicker"
import ToolBar from "@material-ui/core/Toolbar"
import useToolbarStyles from "hooks/useToolbarStylesV2"
import useCleanup from "hooks/useCleanup"

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
