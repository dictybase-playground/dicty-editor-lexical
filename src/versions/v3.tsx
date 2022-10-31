import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV3 from "plugins/ToolbarPlugin/versions/ToolbarV3"

const EditorV3 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ToolbarV3 />
  </EditorBase>
)

export default EditorV3
