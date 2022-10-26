import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
  GridSelection,
  NodeSelection,
} from "lexical"
import type { LexicalEditor, RangeSelection } from "lexical"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd,
} from "@lexical/selection"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list"
import { createPortal } from "react-dom"
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text"
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code"
import { IconButton } from "@material-ui/core"
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  Code,
  InsertLink,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  SaveAlt,
} from "@material-ui/icons"

const LowPriority = 1

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
])

type BlockType =
  | "code"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "ol"
  | "paragraph"
  | "quote"
  | "ul"

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
}

type SelectProperties = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className: string
  options: string[]
  value: string
}

const Select = ({ onChange, className, options, value }: SelectProperties) => (
  <select className={className} onChange={onChange} value={value}>
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <option hidden value="" />
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

const getSelectedNode = (selection: RangeSelection) => {
  const { anchor } = selection
  const { focus } = selection
  const anchorNode = selection.anchor.getNode()
  const focusNode = focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  }
  return $isAtNodeEnd(anchor) ? focusNode : anchorNode
}

const Divider = () => <div className="divider" />

const positionEditorElement = (editor: HTMLDivElement, rect?: DOMRect) => {
  if (rect) {
    // eslint-disable-next-line no-param-reassign
    editor.style.opacity = "1"
    // eslint-disable-next-line no-param-reassign
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`
    // eslint-disable-next-line no-param-reassign
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`
  } else {
    // eslint-disable-next-line no-param-reassign
    editor.style.opacity = "0"
    // eslint-disable-next-line no-param-reassign
    editor.style.top = "-1000px"
    // eslint-disable-next-line no-param-reassign
    editor.style.left = "-1000px"
  }
}

type FloatingLinkEditorProperties = {
  editor: LexicalEditor
}

const FloatingLinkEditor = ({ editor }: FloatingLinkEditorProperties) => {
  const editorReference = useRef(null)
  const inputReference = useRef(null)
  const mouseDownReference = useRef(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [isEditMode, setEditMode] = useState(false)
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | GridSelection | NodeSelection | null
    // eslint-disable-next-line unicorn/no-null
  >(null)

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl("")
      }
    }
    const editorElement = editorReference.current
    const nativeSelection = window.getSelection()
    const { activeElement } = document

    if (editorElement === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection &&
      nativeSelection &&
      !nativeSelection.isCollapsed &&
      rootElement &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0)
      let rect
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement
        while (inner.firstElementChild) {
          inner = inner.firstElementChild as HTMLElement
        }
        rect = inner.getBoundingClientRect()
      } else {
        rect = domRange.getBoundingClientRect()
      }

      if (!mouseDownReference.current) {
        positionEditorElement(editorElement, rect)
      }
      setLastSelection(selection)
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElement)
      // eslint-disable-next-line unicorn/no-null
      setLastSelection(null)
      setEditMode(false)
      setLinkUrl("")
    }
  }, [editor])

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateLinkEditor()
          })
        }),

        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateLinkEditor()
            return true
          },
          LowPriority,
        ),
      ),
    [editor, updateLinkEditor],
  )

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isEditMode && inputReference.current) {
      //  @ts-ignore --- reference.current gets value when elements render
      inputReference.current.focus()
    }
  }, [isEditMode])

  return (
    <div ref={editorReference} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputReference}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
                }
                setEditMode(false)
              }
            } else if (event.key === "Escape") {
              event.preventDefault()
              setEditMode(false)
            }
          }}
        />
      ) : (
        <div className="link-input">
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkUrl}
          </a>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <div
            className="link-edit"
            role="button"
            tabIndex={0}
            onMouseDown={(event) => event.preventDefault()}
            onKeyDown={(event) => {
              if (event.key === "13") setEditMode(true)
            }}
            onClick={() => {
              setEditMode(true)
            }}
          />
        </div>
      )}
    </div>
  )
}

type BlockOptionsDropdownListProperties = {
  editor: LexicalEditor
  blockType: BlockType
  toolbarRef: React.MutableRefObject<null>
  setShowBlockOptionsDropDown: React.Dispatch<SetStateAction<boolean>>
}

const BlockOptionsDropdownList = ({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}: BlockOptionsDropdownListProperties) => {
  const dropDownReference = useRef(null)

  useEffect(() => {
    const toolbar = toolbarRef.current
    const dropDown = dropDownReference.current

    if (toolbar !== null && dropDown !== null) {
      //  @ts-ignore --- reference.current gets value when elements render
      const { top, left } = toolbar.getBoundingClientRect()
      //  @ts-ignore --- reference.current gets value when elements render
      dropDown.style.top = `${top + 40}px`
      //  @ts-ignore --- reference.current gets value when elements render
      dropDown.style.left = `${left}px`
    }
  }, [dropDownReference, toolbarRef])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const dropDown = dropDownReference.current
    const toolbar = toolbarRef.current

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: Event) => {
        const { target } = event

        //  @ts-ignore --- reference.current gets value when elements render
        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false)
        }
      }
      document.addEventListener("click", handle)

      return () => {
        document.removeEventListener("click", handle)
      }
    }
  }, [dropDownReference, setShowBlockOptionsDropDown, toolbarRef])

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatBulletList = () => {
    if (blockType !== "ul") {
      // @ts-ignore --- 2nd parameter (payload) is optional
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
    } else {
      // @ts-ignore --- 2nd parameter (payload) is optional
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      // @ts-ignore --- 2nd parameter (payload) is optional
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
    } else {
      // @ts-ignore --- 2nd parameter (payload) is optional
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  return (
    <div className="dropdown" ref={dropDownReference}>
      <button type="button" className="item" onClick={formatParagraph}>
        <span className="icon paragraph" />
        <span className="text">Normal</span>
        {blockType === "paragraph" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatLargeHeading}>
        <span className="icon large-heading" />
        <span className="text">Large Heading</span>
        {blockType === "h1" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatSmallHeading}>
        <span className="icon small-heading" />
        <span className="text">Small Heading</span>
        {blockType === "h2" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatBulletList}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === "ul" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatNumberedList}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === "ol" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatQuote}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === "quote" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatCode}>
        <span className="icon code" />
        <span className="text">Code Block</span>
        {blockType === "code" && <span className="active" />}
      </button>
    </div>
  )
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const toolbarReference = useRef(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [blockType, setBlockType] = useState<BlockType>("paragraph")
  const [selectedElementKey, setSelectedElementKey] = useState("")
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false)
  const [codeLanguage, setCodeLanguage] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRTL, setIsRTL] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          setBlockType(type as BlockType)
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsCode(selection.hasFormat("code"))
      setIsRTL($isParentElementRTL(selection))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [editor])

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar()
          })
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar()
            return false
          },
          LowPriority,
        ),
        editor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload)
            return false
          },
          LowPriority,
        ),
        editor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload)
            return false
          },
          LowPriority,
        ),
      ),
    [editor, updateToolbar],
  )

  const codeLanguges = useMemo(() => getCodeLanguages(), [])
  const onCodeLanguageSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(event.target.value)
          }
        }
      })
    },
    [editor, selectedElementKey],
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
    } else {
      // eslint-disable-next-line unicorn/no-null
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  return (
    <div className="toolbar" ref={toolbarReference}>
      <IconButton
        type="button"
        disabled={!canUndo}
        onClick={() => {
          // @ts-ignore --- 2nd parameter (payload) is optional
          editor.dispatchCommand(UNDO_COMMAND)
        }}
        className="toolbar-item spaced"
        aria-label="Undo">
        <i className="format undo" />
      </IconButton>
      <IconButton
        type="button"
        disabled={!canRedo}
        onClick={() => {
          // @ts-ignore --- 2nd parameter (payload) is optional
          editor.dispatchCommand(REDO_COMMAND)
        }}
        className="toolbar-item"
        aria-label="Redo">
        <i className="format redo" />
      </IconButton>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            type="button"
            className="toolbar-item block-controls"
            onClick={() =>
              setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
            }
            aria-label="Formatting Options">
            <span className={`icon block-type ${blockType}`} />
            <span className="text">{blockTypeToBlockName[blockType]}</span>
            <i className="chevron-down" />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarReference}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body,
            )}
          <Divider />
        </>
      )}
      {blockType === "code" ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }}
            className={`toolbar-item spaced ${isBold ? "active" : ""}`}
            aria-label="Format Bold">
            <FormatBold />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }}
            className={`toolbar-item spaced ${isItalic ? "active" : ""}`}
            aria-label="Format Italics">
            <FormatItalic />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }}
            className={`toolbar-item spaced ${isUnderline ? "active" : ""}`}
            aria-label="Format Underline">
            <FormatUnderlined />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }}
            className={`toolbar-item spaced ${isStrikethrough ? "active" : ""}`}
            aria-label="Format Strikethrough">
            <StrikethroughS />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
            }}
            className={`toolbar-item spaced ${isCode ? "active" : ""}`}
            aria-label="Insert Code">
            <Code />
          </IconButton>
          <IconButton
            type="button"
            onClick={insertLink}
            className={`toolbar-item spaced ${isLink ? "active" : ""}`}
            aria-label="Insert Link">
            <InsertLink />
          </IconButton>
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
            }}
            className="toolbar-item spaced"
            aria-label="Left Align">
            <FormatAlignLeft />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
            }}
            className="toolbar-item spaced"
            aria-label="Center Align">
            <FormatAlignCenter />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
            }}
            className="toolbar-item spaced"
            aria-label="Right Align">
            <FormatAlignRight />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
            }}
            className="toolbar-item"
            aria-label="Justify Align">
            <FormatAlignJustify />
          </IconButton>
          <IconButton>
            <SaveAlt />
          </IconButton>
        </>
      )}
    </div>
  )
}

export default ToolbarPlugin
