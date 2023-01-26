import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import FontFamilyDropdown from "components/FontFamilyDropdown"
import BlockFormatDropdown from "components/BlockFormatDropdown"
import InsertTableButton from "components/InsertTableButton"
import InsertImageButton from "components/InsertImageButton"
import RedoButton from "components/RedoButton"
import UndoButton from "components/UndoButton"
import ColorPickerButton from "components/ColorPickerButton"
import useToolbarStyles from "hooks/useToolbarStylesV2"
import useCleanup from "hooks/useCleanup"
import ToolBar from "@material-ui/core/Toolbar"

const ToolbarV8 = () => {
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
      <ColorPickerButton />
      <InsertTableButton />
      <InsertImageButton />
    </ToolBar>
  )
}

export default ToolbarV8
