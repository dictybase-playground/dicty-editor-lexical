import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import EditorBase from "components/EditorBase"
import ToolbarV5 from "plugins/ToolbarV5"
import Actions from "components/Actions"

const EditorV6 = () => (
  <EditorBase>
    <ListPlugin />
    <Actions />
    <ToolbarV5 />
  </EditorBase>
)

export default EditorV6
