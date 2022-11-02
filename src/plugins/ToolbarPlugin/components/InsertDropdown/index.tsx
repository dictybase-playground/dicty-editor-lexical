import React, { useState } from "react"
import { LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import { TablePlugin } from "@lexical/react/LexicalTablePlugin"
import Dropdown from "ui/Dropdown"
import type { InsertImagePayload } from "../../../ImagesPlugin"
import ImagesPlugin, { INSERT_IMAGE_COMMAND } from "../../../ImagesPlugin"
import YouTubePlugin, { INSERT_YOUTUBE_COMMAND } from "../../YouTubePlugin"
import TableCellActionMenuPlugin from "../../../TableActionMenuPlugin"
import HorizontalRulePlugin from "../../HorizontalRulePlugin"
import Button from "../../../../ui/Button"
import TextInput from "../../../../ui/TextInput"
import FileInput from "../../../../ui/FileInput"
import useModal from "../../../../hooks/useModal"
import TableCellResizer from "../../TableCellResizer"

// Taken from https://stackoverflow.com/a/9102270
const YOUTUBE_ID_PARSER =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/

const parseYouTubeVideoID = (url: string) => {
  const urlMatches = url.match(YOUTUBE_ID_PARSER)

  return urlMatches?.[2].length === 11 ? urlMatches[2] : null
}

// #region Inserting different modules
const InsertImageDialog = ({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor
  onClose: () => void
}): JSX.Element => {
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
            data-test-id="image-modal-option-sample"
            onClick={() =>
              onClick({
                altText: "Yellow flower in tilt shift lens",
                src: null, // yellowFlowerImage,
              })
            }>
            Sample
          </Button>
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

const InsertTableDialog = ({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor
  onClose: () => void
}): JSX.Element => {
  const [rows, setRows] = useState("5")
  const [columns, setColumns] = useState("5")

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows })
    onClose()
  }

  return (
    <>
      <TextInput label="No of rows" onChange={setRows} value={rows} />
      <TextInput label="No of columns" onChange={setColumns} value={columns} />
      <div
        className="ToolbarPlugin__dialogActions"
        data-test-id="table-model-confirm-insert">
        <Button onClick={onClick}>Confirm</Button>
      </div>
    </>
  )
}

const VALID_TWITTER_URL = /twitter.com\/[\dA-Za-z]{1,20}\/status\/(\d*)/g

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

const InsertYouTubeDialog = ({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor
  onClose: () => void
}): JSX.Element => {
  const [text, setText] = useState("")

  const onClick = () => {
    const videoID = parseYouTubeVideoID(text)
    if (videoID) {
      activeEditor.dispatchCommand(INSERT_YOUTUBE_COMMAND, videoID)
    }
    onClose()
  }

  const isDisabled = text === "" || !parseYouTubeVideoID(text)

  return (
    <>
      <TextInput
        data-test-id="youtube-embed-modal-url"
        label="YouTube URL"
        placeholder="i.e. https://www.youtube.com/watch?v=jNQXAC9IVRw"
        onChange={setText}
        value={text}
      />
      <div className="ToolbarPlugin__dialogActions">
        <Button
          data-test-id="youtube-embed-modal-submit-btn"
          disabled={isDisabled}
          onClick={onClick}>
          Confirm
        </Button>
      </div>
    </>
  )
}

// #endregion Inserting different modules

export interface IInsertDropdownProperties {
  enableTable?: boolean
  enableYoutube?: boolean
  enableTwitter?: boolean
  enablePoll?: boolean
  enableImage?: boolean
  enableEquations?: boolean
  enableExcalidraw?: boolean
  enableHorizontalRule?: boolean
  enableStickyNote?: boolean
}

const InsertDropdown: React.FC<IInsertDropdownProperties> = ({
  enableTable = true,
  enableImage = true,
  enableYoutube = false,
  enableHorizontalRule = false,
}: IInsertDropdownProperties) => {
  const [editor] = useLexicalComposerContext()
  const [modal, showModal] = useModal()

  return (
    <div>
      {enableTable && (
        <>
          <TablePlugin />
          <TableCellActionMenuPlugin />
          <TableCellResizer />
        </>
      )}
      {enableYoutube && <YouTubePlugin />}
      {enableImage && <ImagesPlugin />}
      {enableHorizontalRule && <HorizontalRulePlugin />}

      <Dropdown
        buttonClassName="toolbar-item spaced"
        buttonLabel="Insert"
        buttonAriaLabel="Insert specialized editor node"
        buttonIconClassName="icon plus">
        {enableHorizontalRule && (
          <button
            onClick={() => {
              editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND)
            }}
            className="item"
            type="button">
            <i className="icon horizontal-rule" />
            <span className="text">Horizontal Rule</span>
          </button>
        )}
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
        {enableTable && (
          <div>
            <button
              onClick={() => {
                showModal("Insert Table", (onClose) => (
                  <InsertTableDialog activeEditor={editor} onClose={onClose} />
                ))
              }}
              className="item"
              type="button">
              <i className="icon table" />
              <span className="text">Table</span>
            </button>
          </div>
        )}
        {enableYoutube && (
          <button
            onClick={() => {
              showModal("Insert YouTube Video", (onClose) => (
                <InsertYouTubeDialog activeEditor={editor} onClose={onClose} />
              ))
            }}
            className="item"
            type="button">
            <i className="icon youtube" />
            <span className="text">YouTube Video</span>
          </button>
        )}
      </Dropdown>
      {modal}
    </div>
  )
}

export default InsertDropdown
