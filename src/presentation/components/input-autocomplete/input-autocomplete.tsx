import Input, { InputProps } from '@/presentation/components/input/input'
import React from 'react'
import { InputContainer, TermsContainer } from './input-autocomplete.styles'

type AutocompleteItem = {
  id: string
  label: string
}

interface InputAutoCompleteProps extends InputProps {
  options: AutocompleteItem[]
  onAutoCompleteSearch(term: string): void
  onAutoCompleteSelect(id: string): void
}

const InputAutocomplete: React.FC<InputAutoCompleteProps> = ({
  options,
  onAutoCompleteSearch,
  onAutoCompleteSelect,
  value: valueTerm,
  autoComplete: disabledAutoComplete,
  ...rest
}: any) => {
  const [inputText, setInputText] = React.useState<string>(valueTerm ?? '')
  const [searching, setSearching] = React.useState<boolean>(false)
  const [timer, setTimer] = React.useState<any>(0)

  const existTerms = React.useMemo(() => options.length > 0, [options])

  const searchTerm = React.useCallback(
    (term: string) => {
      clearTimeout(timer)
      setTimer(
        setTimeout(() => {
          onAutoCompleteSearch(term)
          setSearching(false)
        }, 1000),
      )
    },
    [onAutoCompleteSearch, timer],
  )

  const handleChangeTerm = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const term = event.target.value
      setInputText(term)

      if (term.length >= 3) {
        setSearching(true)
        searchTerm(term)
      }
    },
    [searchTerm],
  )

  const handleSelectTerm = React.useCallback(
    (term: AutocompleteItem) => {
      setInputText(term.label)
      onAutoCompleteSelect(term.id)
    },
    [onAutoCompleteSelect],
  )

  return (
    <InputContainer className="input-form">
      <div className="input-content">
        <Input
          {...rest}
          type="text"
          value={inputText}
          onChange={handleChangeTerm}
          autoComplete="chrome-off"
        />
        {!!searching && <span>pesquisando...</span>}
      </div>
      {existTerms && (
        <TermsContainer>
          {options.map((item: AutocompleteItem, index: number) => (
            <li
              key={`${index}-${item.id}-${item.label}`}
              onClick={() => handleSelectTerm(item)}
            >
              {item.label}
            </li>
          ))}
        </TermsContainer>
      )}
    </InputContainer>
  )
}

export default InputAutocomplete
