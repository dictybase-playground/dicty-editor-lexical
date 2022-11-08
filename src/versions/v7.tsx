import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import ToolbarV6 from "plugins/ToolbarPlugin/versions/ToolbarV6"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode, ListNode } from "@lexical/list"
import { ImageNode } from "nodes/ImageNode"

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

const EditorV7 = () => (
  <EditorBase
    nodes={[HeadingNode, QuoteNode, ImageNode, ListItemNode, ListNode]}
    theme={additonalThemes}>
    <HistoryPlugin />
    <ListPlugin />
    <ToolbarV6 />
  </EditorBase>
)

export default EditorV7
