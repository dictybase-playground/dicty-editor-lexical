import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ColorPicker from "./ColorPicker"
import LexicalTestComposer from "./LexicalTestComposer"

describe("ColorPicker", () => {
  test("Given an array of strings of length N, it renders N buttons", () => {
    const colorOptions = [
      "hsl(0, 0%, 0%)",
      "hsl(210, 100%, 25.1%)",
      "hsl(210, 100%, 45%)",
      "hsl(209, 100%, 75%)",
      "hsl(211, 100%, 95%)",
      "hsl(0, 0%, 100%)",
      "hsl(53, 100%, 60%)",
    ]

    render(
      <LexicalTestComposer>
        <ColorPicker colorOptions={colorOptions} />
      </LexicalTestComposer>,
    )
    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(colorOptions.length)
  })
})
