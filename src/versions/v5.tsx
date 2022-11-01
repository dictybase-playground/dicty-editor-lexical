import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV5 from "plugins/ToolbarPlugin/versions/ToolbarV5"
import FontSizeDropdown from "plugins/ToolbarPlugin/components/FontSizeDropdown"
import FontFamilyDropdown from "plugins/ToolbarPlugin/components/FontFamilyDropdown"
import AlignDropdown from "plugins/ToolbarPlugin/components/AlignDropdown"
import Divider from "ui/Divider"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "plugins/ToolbarPlugin/components/buttons"

const EditorV5 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ToolbarV5>
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <AlignDropdown />
    </ToolbarV5>
  </EditorBase>
)

export default EditorV5
