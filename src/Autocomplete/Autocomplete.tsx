import React, { useRef, useState } from 'react'
import { ItemProps } from '../ActionList'
import { ItemInput } from '../ActionList/List'
import { AutocompleteContext } from './AutocompleteContext'

interface Props {
  filterValue?: string
  filterFn?: (item: ItemInput, i: number) => boolean;
}

const defaultItemFilter = (filterValue: string) => (item: ItemInput, _i: number) =>
  Boolean(item?.text?.toLowerCase().startsWith((filterValue).toLowerCase()));

const Autocomplete: React.FC<Props> = ({ children, filterValue = '', filterFn: externalFilterFn }) => {
    const activeDescendantRef = useRef<HTMLElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>(filterValue);
    const [showMenu, setShowMenu] = useState(false)
    const [autocompleteSuggestion, setAutocompleteSuggestion] = useState<string>('');

    return (
      <AutocompleteContext.Provider value={{
        activeDescendantRef,
        autocompleteSuggestion,
        filterFn: externalFilterFn ? externalFilterFn : defaultItemFilter(inputValue),
        inputRef,
        inputValue,
        showMenu,
        setAutocompleteSuggestion,
        setInputValue,
        setShowMenu,
      }}>
        {children}
      </AutocompleteContext.Provider>
    )
  }

export default Autocomplete