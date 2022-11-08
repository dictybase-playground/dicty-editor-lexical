import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import ToolbarV6 from "plugins/ToolbarPlugin/versions/ToolbarV6"
import FontSizeDropdown from "plugins/ToolbarPlugin/components/FontSizeDropdown"
import FontFamilyDropdown from "plugins/ToolbarPlugin/components/FontFamilyDropdown"
import AlignDropdown from "plugins/ToolbarPlugin/components/AlignDropdown"
import InsertDropdown from "plugins/ToolbarPlugin/components/InsertDropdown/InsertDropdownV1"
import BlockFormatDropdown from "plugins/ToolbarPlugin/components/BlockFormatDropdown"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "plugins/ToolbarPlugin/components/buttons"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode, ListNode } from "@lexical/list"
import { ImageNode } from "nodes/ImageNode"
import Divider from "ui/Divider"
import ColorPicker from "ui/ColorPicker"

const additonalThemes = {
  image: "editor-image",
  quote: "editor-quote",
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
    listitemChecked: "editor-listitemChecked",
    listitemUnchecked: "editor-listitemUnchecked",
  },
}

const EditorV8 = () => (
  <EditorBase
    nodes={[HeadingNode, QuoteNode, ImageNode, ListItemNode, ListNode]}
    theme={additonalThemes}>
    <HistoryPlugin />
    <ListPlugin />
    <ToolbarV6>
      <BlockFormatDropdown />
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <AlignDropdown />
      <ColorPicker
        buttonLabel="Font Color"
        buttonClassName="toolbar-item color-picker"
        color="#000000"
      />
      <Divider />
      <InsertDropdown />
    </ToolbarV6>
  </EditorBase>
)

export default EditorV8
