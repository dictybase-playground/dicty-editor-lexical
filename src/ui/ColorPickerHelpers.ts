function clamp(value: number, max: number, min: number) {
  return value > max ? max : value < min ? min : value
}

interface RGB {
  b: number
  g: number
  r: number
}
interface HSV {
  h: number
  s: number
  v: number
}
interface Color {
  hex: string
  hsv: HSV
  rgb: RGB
}

function toHex(value: string): string {
  if (!value.startsWith("#")) {
    const context = document.createElement("canvas").getContext("2d")

    if (!context) {
      throw new Error("2d context not supported or canvas already initialized")
    }

    context.fillStyle = value

    return context.fillStyle
  }
  if (value.length === 4 || value.length === 5) {
    return [...value].map((v, index) => (index ? v + v : "#")).join("")
  }
  if (value.length === 7 || value.length === 9) {
    return value
  }

  return "#000000"
}

function hex2rgb(hex: string): RGB {
  const rbgArray = (
    hex
      .replace(
        /^#?([\da-f])([\da-f])([\da-f])$/i,
        // eslint-disable-next-line prefer-template
        (m, r, g, b) => "#" + r + r + g + g + b + b,
      )
      .slice(1)
      .match(/.{2}/g) || []
  ).map((x) => Number.parseInt(x, 16))

  return {
    b: rbgArray[2],
    g: rbgArray[1],
    r: rbgArray[0],
  }
}

function rgb2hsv({ r, g, b }: RGB): HSV {
  const R = r / 255
  const G = g / 255
  const B = b / 255

  const max = Math.max(R, G, B)
  const d = max - Math.min(R, G, B)

  const h = d
    ? (max === R
        ? (G - B) / d + (G < B ? 6 : 0)
        : max === G
        ? 2 + (B - R) / d
        : 4 + (R - G) / d) * 60
    : 0
  const s = max ? (d / max) * 100 : 0
  const v = max * 100

  return { h, s, v }
}

function hsv2rgb({ h, s, v }: HSV): RGB {
  const S = s / 100
  const V = v / 100

  // eslint-disable-next-line unicorn/prevent-abbreviations
  const i = Math.trunc(h / 60)
  const f = h / 60 - i
  const p = V * (1 - S)
  const q = V * (1 - S * f)
  const t = V * (1 - S * (1 - f))
  const index = i % 6

  const r = Math.round([V, q, p, p, t, V][index] * 255)
  const g = Math.round([t, V, V, q, p, p][index] * 255)
  const b = Math.round([p, p, t, V, V, q][index] * 255)

  return { b, g, r }
}

function rgb2hex({ b, g, r }: RGB): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`
}

function transformColor<M extends keyof Color, C extends Color[M]>(
  format: M,
  color: C,
): Color {
  let hex: Color["hex"] = toHex("#121212")
  let rgb: Color["rgb"] = hex2rgb(hex)
  let hsv: Color["hsv"] = rgb2hsv(rgb)

  switch (format) {
    case "hex": {
      const value = color as Color["hex"]
      hex = toHex(value)
      rgb = hex2rgb(hex)
      hsv = rgb2hsv(rgb)
      break
    }
    case "rgb": {
      const value = color as Color["rgb"]
      rgb = value
      hex = rgb2hex(rgb)
      hsv = rgb2hsv(rgb)
      break
    }
    case "hsv": {
      const value = color as Color["hsv"]
      hsv = value
      rgb = hsv2rgb(hsv)
      hex = rgb2hex(rgb)
      break
    }
    default: {
      return { hex, hsv, rgb }
    }
  }
  return { hex, hsv, rgb }
}

export { clamp, toHex, hex2rgb, rgb2hsv, hsv2rgb, rgb2hex, transformColor }
