import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import FontFamilyDropdown from "components/FontFamilyDropdown"
import ColorPickerButton from "components/ColorPickerButton"
import useToolbarStyles from "utils/ToolbarStylesV2"
import ToolBar from "@material-ui/core/Toolbar"
import useCleanup from "../hooks/useCleanup"

const ToolbarV4 = () => {
  useCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <ToolBar variant="dense" className={toolbarClasses.root}>
      <Divider />
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <ColorPickerButton />
    </ToolBar>
  )
}

export default ToolbarV4
