import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV5 from "plugins/ToolbarPlugin/versions/ToolbarV5"
import FontSizeDropdown from "plugins/ToolbarPlugin/components/FontSizeDropdown"
import FontFamilyDropdown from "plugins/ToolbarPlugin/components/FontFamilyDropdown"
import AlignDropdown from "plugins/ToolbarPlugin/components/AlignDropdown"
import InsertDropdown from "plugins/ToolbarPlugin/components/InsertDropdown/InsertDropdownV1"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "plugins/ToolbarPlugin/components/buttons"
import { ImageNode } from "nodes/ImageNode"
import Divider from "ui/Divider"

const EditorV6 = () => (
  <EditorBase nodes={[ImageNode]}>
    <HistoryPlugin />
    <ToolbarV5>
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <AlignDropdown />
      <Divider />
      <InsertDropdown />
    </ToolbarV5>
  </EditorBase>
)

export default EditorV6
