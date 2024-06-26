import { useEffect, useRef } from 'react'
import { find } from '../use-cases/find'
import useStore from '../store'
import useToggle from '../hooks/use-toggle'

export default function _Find(): JSX.Element {
  const store = useStore()

  const [forceFindFlag, toggleForceFindFlag] = useToggle()
  const hrefWithoutHash = useRef(getHrefWithoutHash(location.href))
  useEffect(() => {
    ;(window as any).navigation?.addEventListener('navigate', handleNavigate)
    return () => {
      ;(window as any).navigation?.removeEventListener('navigate', handleNavigate)
    }

    function handleNavigate() {
      const currentHrefWithoutHash = getHrefWithoutHash(location.href)
      if (currentHrefWithoutHash === hrefWithoutHash.current) return

      hrefWithoutHash.current = currentHrefWithoutHash
      toggleForceFindFlag()
    }
  }, [forceFindFlag])

  useEffect(() => {
    store.dispatch({ type: 'ClearMatch' })
    store.dispatch({ type: 'ToggleFinding', value: true })

    const { stop } = find({
      documentElement: document.documentElement,
      text: store.text,
      shouldMatchCase: store.shouldMatchCase,
      shouldMatchWholeWord: store.shouldMatchWholeWord,
      shouldUseRegularExpression: store.shouldUseRegularExpression,
      onNext: (ranges) => {
        store.dispatch({
          type: 'Match',
          match: { id: Math.random().toString(36), ranges },
        })
      },
      onComplete: () => {
        store.dispatch({ type: 'ToggleFinding', value: false })
      },
    })

    return () => {
      stop()
    }
  }, [store.shouldMatchCase, store.shouldMatchWholeWord, store.shouldUseRegularExpression, store.text, forceFindFlag])

  return <></>
}

function getHrefWithoutHash(href: string): string {
  const url = new URL(href)
  url.hash = ''
  return url.href
}
