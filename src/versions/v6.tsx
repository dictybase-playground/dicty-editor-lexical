import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV6 from "plugins/ToolbarPlugin/versions/ToolbarV6"
import { ImageNode } from "nodes/ImageNode"

const imageTheme = {
  image: "editor-image",
}

const EditorV6 = () => (
  <EditorBase nodes={[ImageNode]} theme={imageTheme}>
    <HistoryPlugin />
    <ToolbarV6 />
  </EditorBase>
)

export default EditorV6
