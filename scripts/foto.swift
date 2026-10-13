// Convierte una foto (HEIC, JPG, PNG…) en un JPG para la web:
// aplica la rotación del iPhone, recorta al centro en formato vertical 3:4
// y la deja a 1200 × 1600 px.
//
// Uso: swift scripts/foto.swift entrada.heic salida.jpg

import Foundation
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count == 3 else {
  print("Uso: swift scripts/foto.swift entrada salida.jpg")
  exit(1)
}

let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
let targetW = 1200, targetH = 1600

guard let src = CGImageSourceCreateWithURL(input as CFURL, nil),
      // Miniatura con la rotación EXIF ya aplicada
      let rotated = CGImageSourceCreateThumbnailAtIndex(src, 0, [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceThumbnailMaxPixelSize: 4000,
      ] as CFDictionary)
else {
  print("No se pudo leer \(args[1])")
  exit(1)
}

// Recorte central a 3:4 vertical
let w = rotated.width, h = rotated.height
var crop: CGRect
if w * 4 > h * 3 {
  let cw = h * 3 / 4
  crop = CGRect(x: (w - cw) / 2, y: 0, width: cw, height: h)
} else {
  let ch = w * 4 / 3
  crop = CGRect(x: 0, y: (h - ch) / 2, width: w, height: ch)
}
guard let cropped = rotated.cropping(to: crop) else { exit(1) }

// Escalado a 1200 × 1600
let ctx = CGContext(data: nil, width: targetW, height: targetH, bitsPerComponent: 8, bytesPerRow: 0,
                    space: CGColorSpace(name: CGColorSpace.sRGB)!,
                    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
ctx.interpolationQuality = .high
ctx.draw(cropped, in: CGRect(x: 0, y: 0, width: targetW, height: targetH))

guard let final = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(output as CFURL, UTType.jpeg.identifier as CFString, 1, nil)
else { exit(1) }
CGImageDestinationAddImage(dest, final, [kCGImageDestinationLossyCompressionQuality: 0.8] as CFDictionary)
CGImageDestinationFinalize(dest)
print("✓ \(output.lastPathComponent)  \(targetW)×\(targetH)")
