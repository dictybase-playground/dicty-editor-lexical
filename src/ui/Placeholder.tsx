/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "./Placeholder.css"

import * as React from "react"

const Placeholder = ({
  children,
  className = "Placeholder__root",
}: {
  children: JSX.Element | string | (JSX.Element | string)[]
  // eslint-disable-next-line react/require-default-props
  className?: string
}): JSX.Element => <div className={className}>{children}</div>

export default Placeholder
