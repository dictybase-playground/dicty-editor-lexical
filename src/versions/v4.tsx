import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV4 from "plugins/ToolbarPlugin/versions/ToolbarV4"
import FontSizeDropdown from "plugins/ToolbarPlugin/components/FontSizeDropdown"
import Divider from "ui/Divider"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "plugins/ToolbarPlugin/components/buttons"

const EditorV4 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ToolbarV4>
      <FontSizeDropdown />
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
    </ToolbarV4>
  </EditorBase>
)

export default EditorV4
