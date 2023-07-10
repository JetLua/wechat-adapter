const old = Date.now()

export function now() {
  return Date.now() - old
}
