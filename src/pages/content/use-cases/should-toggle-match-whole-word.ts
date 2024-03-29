import { State } from '../state'
import { IsOSMacOS } from '../utils/ua'

type ShouldToggleMatchWholeWord = (_: {
  event: KeyboardEvent
  state: Pick<State, 'focusing'>
  isOSMacOS: IsOSMacOS
}) => boolean

const shouldToggleMatchWholeWord: ShouldToggleMatchWholeWord = ({
  event,
  state,
  isOSMacOS,
}) => {
  if (state.focusing) {
    if (isOSMacOS()) {
      if (
        event.altKey &&
        !event.ctrlKey &&
        event.metaKey &&
        !event.shiftKey &&
        event.code === 'KeyW'
      ) {
        return true
      }
    } else {
      if (
        event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.code === 'KeyW'
      ) {
        return true
      }
    }
  }

  return false
}

export default shouldToggleMatchWholeWord
