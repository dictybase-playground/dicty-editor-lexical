import React, { useState } from "react"
import { LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import type { InsertImagePayload } from "plugins/ImagesPlugin"
import ImagesPlugin, { INSERT_IMAGE_COMMAND } from "plugins/ImagesPlugin"
import Dropdown from "ui/Dropdown"
import Button from "ui/Button"
import TextInput from "ui/TextInput"
import FileInput from "ui/FileInput"
import useModal from "hooks/useModal"

// #region Inserting different modules

const InsertImageUriDialogBody = ({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void
}) => {
  const [source, setSource] = useState("")
  const [altText, setAltText] = useState("")

  const isDisabled = source === ""

  return (
    <>
      <TextInput
        label="Image URL"
        placeholder="i.e. https://source.unsplash.com/random"
        onChange={setSource}
        value={source}
        data-test-id="image-modal-url-input"
      />
      <TextInput
        label="Alt Text"
        placeholder="Random unsplash image"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <div className="ToolbarPlugin__dialogActions">
        <Button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src: source })}>
          Confirm
        </Button>
      </div>
    </>
  )
}

const InsertImageUploadedDialogBody = ({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void
}) => {
  const [source, setSource] = useState("")
  const [altText, setAltText] = useState("")

  const isDisabled = source === ""

  const loadImage = (files: FileList) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        setSource(reader.result)
      }
      return ""
    })
    reader.readAsDataURL(files[0])
  }

  return (
    <>
      <FileInput
        label="Image Upload"
        onChange={loadImage}
        accept="image/*"
        data-test-id="image-modal-file-upload"
      />
      <TextInput
        label="Alt Text"
        placeholder="Descriptive alternative text"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <div className="ToolbarPlugin__dialogActions">
        <Button
          data-test-id="image-modal-file-upload-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src: source })}>
          Confirm
        </Button>
      </div>
    </>
  )
}

const InsertImageDialog = ({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor
  onClose: () => void
}): JSX.Element => {
  // eslint-disable-next-line unicorn/no-null
  const [mode, setMode] = useState<null | "url" | "file">(null)

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
    onClose()
  }

  return (
    <>
      {!mode && (
        <div className="ToolbarPlugin__dialogButtonsList">
          <Button
            data-test-id="image-modal-option-url"
            onClick={() => setMode("url")}>
            URL
          </Button>
          <Button
            data-test-id="image-modal-option-file"
            onClick={() => setMode("file")}>
            File
          </Button>
        </div>
      )}
      {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
      {mode === "file" && <InsertImageUploadedDialogBody onClick={onClick} />}
    </>
  )
}

// #endregion Inserting different modules

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
