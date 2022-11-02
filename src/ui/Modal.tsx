/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "./Modal.css"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

const PortalImpl = ({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: {
  children: JSX.Element | string | (JSX.Element | string)[]
  closeOnClickOutside: boolean
  onClose: () => void
  title: string
}) => {
  const modalReference = useRef<HTMLDivElement>()

  useEffect(() => {
    if (modalReference.current) {
      modalReference.current.focus()
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line unicorn/no-null
    let modalOverlayElement: HTMLElement | null | undefined = null
    const handler = (event: KeyboardEvent) => {
      if (event.key === "27") {
        onClose()
      }
    }
    const clickOutsideHandler = (event: MouseEvent) => {
      const { target } = event
      if (
        modalReference.current &&
        !modalReference.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose()
      }
    }
    if (modalReference.current !== null) {
      modalOverlayElement = modalReference.current?.parentElement
      if (modalOverlayElement !== null) {
        modalOverlayElement?.addEventListener("click", clickOutsideHandler)
      }
    }

    window.addEventListener("keydown", handler)

    return () => {
      window.removeEventListener("keydown", handler)
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener("click", clickOutsideHandler)
      }
    }
  }, [closeOnClickOutside, onClose])

  return (
    <div className="Modal__overlay" role="dialog">
      <div className="Modal__modal" tabIndex={-1} ref={modalReference}>
        <h2 className="Modal__title">{title}</h2>
        <button
          className="Modal__closeButton"
          aria-label="Close modal"
          type="button"
          onClick={onClose}>
          X
        </button>
        <div className="Modal__content">{children}</div>
      </div>
    </div>
  )
}

export default function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}: {
  children: JSX.Element | string | (JSX.Element | string)[]
  closeOnClickOutside?: boolean
  onClose: () => void
  title: string
}): JSX.Element {
  return createPortal(
    <PortalImpl
      onClose={onClose}
      title={title}
      closeOnClickOutside={closeOnClickOutside}>
      {children}
    </PortalImpl>,
    document.body,
  )
}
