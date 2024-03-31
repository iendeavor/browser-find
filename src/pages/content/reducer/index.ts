import { Action } from '../action'
import { State } from '../state'
import findNext from './find-next'
import findPrevious from './find-previous'
import match from './match'
import toggleFocus from './toggle-focus'
import toggleOpen from './toggle-open'
import toggleShouldMatchCase from './toggle-should-match-case'
import toggleShouldMatchWholeWord from './toggle-should-match-whole-word'
import toggleShouldUseRegularExpression from './toggle-should-use-regular-expression'
import _type from './type'

type Reducer = (state: State, action: Action) => State

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'FindNext':
      return findNext(state, action)
    case 'FindPrevious':
      return findPrevious(state, action)
    case 'Match':
      return match(state, action)
    case 'ToggleFocus':
      return toggleFocus(state, action)
    case 'ToggleOpen':
      return toggleOpen(state, action)
    case 'ToggleShouldMatchCase':
      return toggleShouldMatchCase(state, action)
    case 'ToggleShouldMatchWholeWord':
      return toggleShouldMatchWholeWord(state, action)
    case 'ToggleShouldUseRegularExpression':
      return toggleShouldUseRegularExpression(state, action)
    case 'Type':
      return _type(state, action)
    default:
      const _: never = action
      throw Error('Unimplemented')
  }
}

export default reducer