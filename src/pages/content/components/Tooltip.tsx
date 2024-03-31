import { useEffect, useLayoutEffect, useState } from 'react'
import { computePosition } from '@floating-ui/dom'

export default function Tooltip(): JSX.Element {
  const [tooltip, setTooltip] = useState('')
  const [visible, setVisible] = useState(false)
  const [delayedVisible, setDelayedVisible] = useState(false)

  useEffect(() => {
    let id: number = -1
    if (visible) {
      id = setTimeout(() => {
        setDelayedVisible(true)
      }, 1000) as unknown as number
    } else {
      id = setTimeout(() => {
        setDelayedVisible(false)
      }, 300) as unknown as number
    }

    return () => clearTimeout(id)
  }, [visible])

  useLayoutEffect(() => {
    const topLayerElement = document.querySelector<HTMLElement>(
      '#browser-find-top-layer',
    )
    if (topLayerElement === null) return

    topLayerElement.addEventListener('mouseover', handleMouseover)
    return () => {
      topLayerElement.removeEventListener('mouseover', handleMouseover)
    }

    function handleMouseover(e: MouseEvent) {
      const tooltip = document.querySelector(
        '#browser-find-top-layer #tooltip',
      ) as HTMLElement
      if (tooltip instanceof HTMLElement === false) return

      let target: any = e.target
      while (target) {
        if (target.dataset?.['tooltipContent']) {
          setTooltip(target.dataset['tooltipContent'])
          setVisible(true)
          computePosition(target, tooltip).then(({ x, y }) => {
            tooltip.style.left = `${x < 0 ? 69.25 : x}px`
            tooltip.style.top = `${y + 12}px`
          })
          return
        } else {
          target = target.parentElement
        }
      }

      setVisible(false)
    }
  }, [])
  useLayoutEffect(() => {
    window.addEventListener('blur', handleBlur)
    return () => {
      window.removeEventListener('blur', handleBlur)
    }

    function handleBlur() {
      setVisible(false)
    }
  }, [])
  useLayoutEffect(() => {
    window.addEventListener('keydown', handleBlur)
    return () => {
      window.removeEventListener('keydown', handleBlur)
    }

    function handleBlur() {
      setVisible(false)
    }
  }, [])

  return (
    <div id="tooltip" style={{ opacity: delayedVisible ? 100 : 0 }}>
      {tooltip}
    </div>
  )
}
