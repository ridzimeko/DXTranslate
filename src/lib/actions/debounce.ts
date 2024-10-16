export default function debounce(node: HTMLElement, params: {value: any, func: Function; duration?: number }) {
    let timer: number | undefined

    return {
      update() {
        clearTimeout(timer)
        timer = setTimeout(params.func, params.duration)
      },
      destroy() {
        clearTimeout(timer)
        node.removeEventListener('change', () => timer)
      }
    }
  }