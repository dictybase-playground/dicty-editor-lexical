import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV5 from "plugins/ToolbarPlugin/versions/ToolbarV5"
import { ImageNode } from "nodes/ImageNode"

const imageTheme = {
  image: "editor-image",
}

const EditorV6 = () => (
  <EditorBase nodes={[ImageNode]} theme={imageTheme}>
    <HistoryPlugin />
    <ToolbarV5 />
  </EditorBase>
)

export default EditorV6
