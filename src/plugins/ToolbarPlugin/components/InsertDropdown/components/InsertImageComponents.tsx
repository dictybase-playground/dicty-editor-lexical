import { useState } from "react"
import { LexicalEditor } from "lexical"
import type { InsertImagePayload } from "plugins/ImagesPlugin"
import { INSERT_IMAGE_COMMAND } from "plugins/ImagesPlugin"
import Button from "ui/Button"
import TextInput from "ui/TextInput"
import FileInput from "ui/FileInput"

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

  const loadImage = (files: FileList | null) => {
    if (files) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
          setSource(reader.result)
        }
        return ""
      })
      reader.readAsDataURL(files[0])
    }
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

export default InsertImageDialog
