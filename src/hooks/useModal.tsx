/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useCallback, useMemo, useState } from "react"

import Modal from "../ui/Modal"

const useModal = (): [
  JSX.Element | null,
  (title: string, showModal: (onClose: () => void) => JSX.Element) => void,
] => {
  const [modalContent, setModalContent] = useState<null | {
    closeOnClickOutside: boolean
    content: JSX.Element
    title: string
    // eslint-disable-next-line unicorn/no-null
  }>(null)

  const onClose = useCallback(() => {
    // eslint-disable-next-line unicorn/no-null
    setModalContent(null)
  }, [])

  const modal = useMemo(() => {
    if (modalContent === null) {
      // eslint-disable-next-line unicorn/no-null
      return null
    }
    const { title, content, closeOnClickOutside } = modalContent
    return (
      <Modal
        onClose={onClose}
        title={title}
        closeOnClickOutside={closeOnClickOutside}>
        {content}
      </Modal>
    )
  }, [modalContent, onClose])

  const showModal = useCallback(
    (
      title: string,
      getContent: (onClose: () => void) => JSX.Element,
      closeOnClickOutside = false,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      })
    },
    [onClose],
  )

  return [modal, showModal]
}

export default useModal
