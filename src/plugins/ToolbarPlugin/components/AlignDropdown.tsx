import { useContext } from "react"
import Dropdown from "ui/Dropdown"
import Divider from "ui/Divider"
import {
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"

const AlignDropdown = () => {
  const [editor] = useLexicalComposerContext()
  const { isRTL } = useContext(ToolbarContext) as IToolbarContext

  return (
    <Dropdown
      buttonLabel="Align"
      buttonIconClassName="icon left-align"
      buttonClassName="toolbar-item spaced alignment"
      buttonAriaLabel="Formatting options for text alignment">
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
        }}
        className="item"
        type="button">
        <i className="icon left-align" />
        <span className="text">Left Align</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
        }}
        className="item"
        type="button">
        <i className="icon center-align" />
        <span className="text">Center Align</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
        }}
        className="item"
        type="button">
        <i className="icon right-align" />
        <span className="text">Right Align</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }}
        className="item"
        type="button">
        <i className="icon justify-align" />
        <span className="text">Justify Align</span>
      </button>
      <Divider />
      <button
        onClick={() => {
          // eslint-disable-next-line unicorn/no-useless-undefined
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
        }}
        className="item"
        type="button">
        <i className={`icon ${isRTL ? "indent" : "outdent"}`} />
        <span className="text">Outdent</span>
      </button>
      <button
        onClick={() => {
          // eslint-disable-next-line unicorn/no-useless-undefined
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
        }}
        className="item"
        type="button">
        <i className={`icon ${isRTL ? "indent" : "outdent"}`} />
        <span className="text">Indent</span>
      </button>
    </Dropdown>
  )
}

export default AlignDropdown
