import React from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"

type EditorComposerProperties = {
  children: React.ReactElement
}

const baseTheme = {
  paragraph: "editor-paragraph",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const EditorComposer = ({ children }: EditorComposerProperties) => {
  const initialConfig = {
    namespace: "DictyEditor",
    theme: { ...baseTheme },
    nodes: [HeadingNode, QuoteNode, ListItemNode, ListNode],
    onError,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div>{children}</div>
    </LexicalComposer>
  )
}

export default EditorComposer
