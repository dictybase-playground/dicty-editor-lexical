/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "./ColorPicker.css"

import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { clamp, transformColor } from "./ColorPickerHelpers"

import DropDown from "./Dropdown"
import TextInput from "./TextInput"

interface ColorPickerProperties {
  disabled?: boolean
  buttonAriaLabel: string
  buttonClassName: string
  buttonIconClassName: string
  buttonLabel?: string
  color: string
  children?: ReactNode
  onChange?: (color: string) => void
  title?: string
}

export interface Position {
  x: number
  y: number
}

interface MoveWrapperProperties {
  // eslint-disable-next-line react/require-default-props
  className?: string
  // eslint-disable-next-line react/require-default-props
  style?: React.CSSProperties
  onChange: (position: Position) => void
  children: JSX.Element
}

const basicColors = [
  "#d0021b",
  "#f5a623",
  "#f8e71c",
  "#8b572a",
  "#7ed321",
  "#417505",
  "#bd10e0",
  "#9013fe",
  "#4a90e2",
  "#50e3c2",
  "#b8e986",
  "#000000",
  "#4a4a4a",
  "#9b9b9b",
  "#ffffff",
]

const WIDTH = 214
const HEIGHT = 150

const MoveWrapper = ({
  className,
  style,
  onChange,
  children,
}: MoveWrapperProperties) => {
  const divReference = useRef<HTMLDivElement>(null)

  const move = (event: React.MouseEvent | MouseEvent): void => {
    if (divReference.current) {
      const { current: div } = divReference
      const { width, height, left, top } = div.getBoundingClientRect()

      const x = clamp(event.clientX - left, width, 0)
      const y = clamp(event.clientY - top, height, 0)

      onChange({ x, y })
    }
  }

  const onMouseDown = (event: React.MouseEvent): void => {
    if (event.button !== 0) return

    move(event)

    const onMouseMove = (_event: MouseEvent): void => {
      move(_event)
    }

    const onMouseUp = (_event: MouseEvent): void => {
      document.removeEventListener("mousemove", onMouseMove, false)
      document.removeEventListener("mouseup", onMouseUp, false)

      move(_event)
    }

    document.addEventListener("mousemove", onMouseMove, false)
    document.addEventListener("mouseup", onMouseUp, false)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={divReference}
      className={className}
      style={style}
      onMouseDown={onMouseDown}>
      {children}
    </div>
  )
}

const ColorPicker = ({
  color,
  children,
  onChange,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  buttonLabel,
}: Readonly<ColorPickerProperties>): JSX.Element => {
  const [selfColor, setSelfColor] = useState(transformColor("hex", color))
  const [inputColor, setInputColor] = useState(color)
  const innerDivReference = useRef(null)

  const saturationPosition = useMemo(
    () => ({
      x: (selfColor.hsv.s / 100) * WIDTH,
      y: ((100 - selfColor.hsv.v) / 100) * HEIGHT,
    }),
    [selfColor.hsv.s, selfColor.hsv.v],
  )

  const huePosition = useMemo(
    () => ({
      x: (selfColor.hsv.h / 360) * WIDTH,
    }),
    [selfColor.hsv],
  )

  const onSetHex = (hex: string) => {
    setInputColor(hex)
    if (/^#[\da-f]{6}$/i.test(hex)) {
      const newColor = transformColor("hex", hex)
      setSelfColor(newColor)
    }
  }

  const onMoveSaturation = ({ x, y }: Position) => {
    const newHsv = {
      ...selfColor.hsv,
      s: (x / WIDTH) * 100,
      v: 100 - (y / HEIGHT) * 100,
    }
    const newColor = transformColor("hsv", newHsv)
    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }

  const onMoveHue = ({ x }: Position) => {
    const newHsv = { ...selfColor.hsv, h: (x / WIDTH) * 360 }
    const newColor = transformColor("hsv", newHsv)

    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }

  useEffect(() => {
    // Check if the dropdown is actually active
    if (innerDivReference.current !== null && onChange) {
      onChange(selfColor.hex)
      setInputColor(selfColor.hex)
    }
  }, [selfColor, onChange])

  useEffect(() => {
    if (color === undefined) return
    const newColor = transformColor("hex", color)
    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }, [color])

  return (
    <DropDown
      buttonLabel={buttonLabel}
      buttonAriaLabel={buttonAriaLabel}
      buttonClassName={buttonClassName}
      buttonIconClassName={buttonIconClassName}
      stopCloseOnClickSelf>
      <div
        className="color-picker-wrapper"
        style={{ width: WIDTH }}
        ref={innerDivReference}>
        <TextInput label="Hex" onChange={onSetHex} value={inputColor} />
        <div className="color-picker-basic-color">
          {basicColors.map((basicColor) => (
            <button
              type="button"
              aria-label={`${basicColor}`}
              className={basicColor === selfColor.hex ? " active" : ""}
              key={basicColor}
              style={{ backgroundColor: basicColor }}
              onClick={() => {
                setInputColor(basicColor)
                setSelfColor(transformColor("hex", basicColor))
              }}
            />
          ))}
        </div>
        <MoveWrapper
          className="color-picker-saturation"
          style={{ backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)` }}
          onChange={onMoveSaturation}>
          <div
            className="color-picker-saturation_cursor"
            style={{
              backgroundColor: selfColor.hex,
              left: saturationPosition.x,
              top: saturationPosition.y,
            }}
          />
        </MoveWrapper>
        <MoveWrapper className="color-picker-hue" onChange={onMoveHue}>
          <div
            className="color-picker-hue_cursor"
            style={{
              backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`,
              left: huePosition.x,
            }}
          />
        </MoveWrapper>
        <div
          className="color-picker-color"
          style={{ backgroundColor: selfColor.hex }}
        />
      </div>
      {children}
    </DropDown>
  )
}

export default ColorPicker
