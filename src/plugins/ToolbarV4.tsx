import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import FontFamilyDropdown from "components/FontFamilyDropdown"
import ColorPicker from "components/ColorPicker"
import ToolBar from "@material-ui/core/Toolbar"
import useToolbarStyles from "hooks/useToolbarStylesV2"
import useCleanup from "hooks/useCleanup"

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
      <ColorPicker />
    </ToolBar>
  )
}

export default ToolbarV4
