import { atom } from "jotai"
import { focusAtom } from "jotai/optics"

export type ButtonStates = "NORMAL" | "LOADING" | "DONE" | "ERROR"

export enum FontFamily {
  ARIAL = "Arial",
  COURIER_NEW = "Courier New",
  GEORGIA = "Georgia",
  TIMES_NEW_ROMAN = "Times New Roman",
  TREBUCHET_MS = "Trebuchet MS",
  VERDANA = "Verdana",
}

export enum BlockTypes {
  PARAGRAPH = "paragraph",
  HEADING_ONE = "h1",
  HEADING_TWO = "h2",
  HEADING_THREE = "h3",
  HEADING_FOUR = "h4",
  BULLET_LIST = "bullet",
  NUMBERED_LIST = "number",
  QUOTE = "quote",
}

const FontSizes = [
  "10px",
  "11px",
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
  "19px",
  "20px",
]

export const formatAtom = atom({
  isBold: false,
  isItalic: false,
  isUnderlined: false,
  fontFamily: FontFamily.ARIAL,
  fontSize: FontSizes[5],
})

export const isBoldAtom = focusAtom(formatAtom, (optic) => optic.prop("isBold"))
export const isItalicAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("isItalic"),
)
export const isUnderlinedAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("isUnderlined"),
)
export const fontFamilyAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("fontFamily"),
)
export const fontSizeAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("fontSize"),
)
export const blockTypeAtom = atom(BlockTypes.PARAGRAPH)
export const canUndoAtom = atom(false)
export const canRedoAtom = atom(false)
export const isRTLAtom = atom(false)
export const pulseAtom = atom(false)
export const textColorAtom = atom("#000000")
export const ButtonStateAtom = atom<ButtonStates>("NORMAL")
