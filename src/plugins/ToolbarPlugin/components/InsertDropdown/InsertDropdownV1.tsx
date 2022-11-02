import React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ImagesPlugin from "plugins/ImagesPlugin"
import Dropdown from "ui/Dropdown"
import useModal from "hooks/useModal"
import InsertImageDialog from "./components/InsertImageComponents"

export interface IInsertDropdownProperties {
  // eslint-disable-next-line react/require-default-props
  enableImage?: boolean
}

const InsertDropdown: React.FC<IInsertDropdownProperties> = ({
  enableImage = true,
}: IInsertDropdownProperties) => {
  const [editor] = useLexicalComposerContext()
  const [modal, showModal] = useModal()

  return (
    <div>
      {enableImage && <ImagesPlugin />}
      <Dropdown
        buttonClassName="toolbar-item spaced"
        buttonLabel="Insert"
        buttonAriaLabel="Insert specialized editor node"
        buttonIconClassName="icon plus">
        {enableImage && (
          <button
            onClick={() => {
              // eslint-disable-next-line react/no-unstable-nested-components
              showModal("Insert Image", (onClose) => (
                <InsertImageDialog activeEditor={editor} onClose={onClose} />
              ))
            }}
            className="item"
            type="button">
            <i className="icon image" />
            <span className="text">Image</span>
          </button>
        )}
      </Dropdown>
      {modal}
    </div>
  )
}

export default InsertDropdown
