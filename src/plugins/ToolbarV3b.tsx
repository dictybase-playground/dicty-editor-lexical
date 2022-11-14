import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import FontFamilyDropdown from "components/FontFamilyDropdown"
import useToolbarStyles from "utils/ToolbarStyles"
import ToolBar from "@material-ui/core/Toolbar"
import useCleanup from "../hooks/useCleanup"

const ToolbarV3b = () => {
  useCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <ToolBar className={toolbarClasses.root}>
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <FontSizeDropdown />
      <FontFamilyDropdown />
    </ToolBar>
  )
}

export default ToolbarV3b
