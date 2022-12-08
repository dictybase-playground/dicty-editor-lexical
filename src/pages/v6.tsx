import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import EditorBase from "components/EditorBase"
import ToolbarV5 from "plugins/ToolbarV5"
import PersistencePlugin from "components/PersistencePlugin"

const EditorV6 = () => (
  <EditorBase>
    <HistoryPlugin />
    <PersistencePlugin />
    <ToolbarV5 />
  </EditorBase>
)

export default EditorV6
