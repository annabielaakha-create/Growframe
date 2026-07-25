/**
 * Luminance → alpha filter for the 3D glass icons.
 *
 * The icon renders are JPEGs on a black field. feColorMatrix writes
 * luminance into the alpha channel, then feComponentTransfer clips the
 * near-black surround away entirely, so the icons carry real transparency
 * and can sit on any background without a visible box.
 *
 * Rendered once in the root layout.
 */
export default function GlassAlphaFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="gf-glass-alpha" colorInterpolationFilters="sRGB">
          {/* keep RGB, set A = perceptual luminance */}
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0.299 0.587 0.114 0 0"
          />
          {/* drop the dark surround, lift the glass */}
          <feComponentTransfer>
            <feFuncA type="linear" slope="1.45" intercept="-0.14" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}
