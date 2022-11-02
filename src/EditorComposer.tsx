import React from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import type { LexicalNode, Klass, EditorThemeClasses } from "lexical"
import "./EditorComposer.css"

type EditorComposerProperties = {
  children: React.ReactElement
  // eslint-disable-next-line react/require-default-props
  nodes?: Klass<LexicalNode>[]
  // eslint-disable-next-line react/require-default-props
  theme?: EditorThemeClasses
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

const EditorComposer = ({
  children,
  nodes = [],
  theme = {},
}: EditorComposerProperties) => {
  const initialConfig = {
    namespace: "DictyEditor",
    theme: { ...baseTheme, ...theme },
    onError,
    nodes,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-shell">{children}</div>
    </LexicalComposer>
  )
}

export default EditorComposer
