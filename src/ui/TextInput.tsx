/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "./Input.css"

type TextInputProperties = Readonly<{
  "data-test-id"?: string
  label: string
  onChange: (argument0: string) => void
  placeholder?: string
  value: string
}>

const TextInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  "data-test-id": dataTestId,
}: TextInputProperties): JSX.Element => (
  <div className="Input__wrapper">
    <label className="Input__label">{label}</label>
    <input
      type="text"
      className="Input__input"
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        onChange(event.target.value)
      }}
      data-test-id={dataTestId}
    />
  </div>
)

export default TextInput
