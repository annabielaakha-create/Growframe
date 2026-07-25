/**
 * Film grain texture.
 *
 * `mix-blend-mode: overlay` on a fixed full-viewport layer forces the browser to
 * recomposite the entire screen on every scroll frame. Dropping the blend mode
 * and lowering the opacity keeps the texture at a fraction of the cost.
 */
export default function Grain() {
  return (
    <div
      aria-hidden
      className="noise pointer-events-none fixed inset-0 z-[150] opacity-[0.025]"
    />
  )
}
