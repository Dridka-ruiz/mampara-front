export const LabToRGB = (l, a, b) => {
  // Normalizar los valores de entrada
  l = Math.max(0, Math.min(100, l));
  a = Math.max(-128, Math.min(127, a));
  b = Math.max(-128, Math.min(127, b));

  // Convertir Lab a XYZ
  let y = (l + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;

  const adjust = (c) => {
    c = c > 0.206893034 ? Math.pow(c, 3) : (c - 16 / 116) / 7.787;
    return c * 100;
  };

  x = adjust(x) / 100;
  y = adjust(y) / 100;
  z = adjust(z) / 100;

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b_ = x * 0.0557 + y * -0.204 + z * 1.057;

  const adjustRGB = (c) => {
    if (c > 0.0031308) {
      c = 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    } else {
      c = 12.92 * c;
    }
    return Math.max(0, Math.min(1, c)) * 255;
  };

  r = adjustRGB(r);
  g = adjustRGB(g);
  b_ = adjustRGB(b_);

  // Convertir los valores RGB a enteros y devolverlos
  return {
    r: Math.round(r),
    g: Math.round(g),
    b_: Math.round(b_),
  };
};
