/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type DropdownProperties = {
  // eslint-disable-next-line react/require-default-props
  buttonLabel?: string
  // eslint-disable-next-line react/require-default-props
  buttonAriaLabel?: string
  buttonClassName: string
  // eslint-disable-next-line react/require-default-props
  buttonIconClassName?: string
  children: ReactNode | string | (ReactNode | string)[]
  // eslint-disable-next-line react/require-default-props
  stopCloseOnClickSelf?: boolean
}

const Dropdown = ({
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
  stopCloseOnClickSelf,
}: DropdownProperties) => {
  const dropDownReference = useRef<HTMLDivElement | null>(null)
  const buttonReference = useRef<HTMLButtonElement | null>(null)
  const [showDropDown, setShowDropDown] = useState(false)

  useEffect(() => {
    const button = buttonReference.current
    const dropDown = dropDownReference.current

    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect()
      dropDown.style.top = `${top + 40}px`
      dropDown.style.left = `${Math.min(
        left,
        window.innerWidth - dropDown.offsetWidth - 20,
      )}px`
    }
  }, [dropDownReference, buttonReference, showDropDown])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const button = buttonReference.current

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const { target } = event
        if (
          stopCloseOnClickSelf &&
          dropDownReference?.current?.contains(target as Node)
        ) {
          return
        }
        if (!button.contains(target as Node)) {
          setShowDropDown(false)
        }
      }
      document.addEventListener("click", handle)

      return () => {
        document.removeEventListener("click", handle)
      }
    }
  }, [dropDownReference, buttonReference, showDropDown, stopCloseOnClickSelf])

  return (
    <>
      <button
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        onClick={() => setShowDropDown(!showDropDown)}
        ref={buttonReference}
        type="button">
        {buttonIconClassName && <span className={buttonIconClassName} />}
        {buttonLabel && (
          <span className="text dropdown-button-text">{buttonLabel}</span>
        )}
        <i className="chevron-down" />
      </button>

      {showDropDown &&
        createPortal(
          <div className="dropdown" ref={dropDownReference}>
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}

export default Dropdown
