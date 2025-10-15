"use client"

import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
  ButtonGroup
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { ChevronDown, X, Ellipsis, Search, ArrowRight, ListFilterPlus } from 'lucide-react'
import { DropdownMenuGroup, DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'

function Filter({ filters }: {
  filters: {
    label: string
    options: string[]
  }[]
}) {
  const hasFilters = filters.length > 0

  return (
    <ButtonGroup className='flex-wrap gap-y-2'>
      {filters.map(filter => <FilterSelectMultiple key={filter.label} label={filter.label} options={filter.options}/>)}
        {hasFilters 
          ? <Button className='border border-black'><ListFilterPlus /></Button>
          : <Button variant={'outline'}><ListFilterPlus /></Button>
        }
    </ButtonGroup>
  )
}

// flicker issue
// wrap issue UI rounded borders

function FilterSelectMultiple({label, options}: {label: string, options: string[]}) {
  if (!label || options.length === 0) {
    return
  }

  // search consts
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  
  // props modified
  const labelLowercase = label.toLocaleLowerCase().split(' ').join('-')
  const sortedOptions = options.toSorted()
  
  // actively selected
  // getAll always returns a string[] (possibly empty). Avoid widening to undefined,
  // so downstream code can safely use .length and .includes.
  const activeValues: string[] = searchParams.getAll(labelLowercase)

  // useState consts
  const [selectedValues, setSelectedValues] = useState<string[]>(activeValues)
  const [isOpen, setIsOpen] = useState(false)
  const [searchLetters, setSearchedLetters] = useState<string | undefined>(undefined)

  // refs
  const inputRef = useRef<HTMLInputElement>(null)
  const firstSearchResultRef = useRef<HTMLDivElement>(null)

  // derived consts
  const filteredOptions = sortedOptions.filter( option => {
    const optionLowercase = option.toLocaleLowerCase().split(' ').join('-')
    if (searchLetters) {
      return (option.toLocaleLowerCase().includes(searchLetters?.toLocaleLowerCase()) && !selectedValues.includes(optionLowercase))
    } else { // if users haven't searched yet, display everything
      return !selectedValues.includes(optionLowercase)
    }
  })
  const hasSearchResults = filteredOptions.length > 0
  const activeValuesPretty = options.filter( option => activeValues.includes(option.toLocaleLowerCase().split(' ').join('-')))
  const selectedValuesPretty = options.filter( option => selectedValues.includes(option.toLocaleLowerCase().split(' ').join('-')))
  const hasSelectedValues = selectedValues.length > 0
  const hasSelectedAllOptions = selectedValues.length === options.length

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedLetters(searchLetters => e.target.value)
    // Refocus the input after state update to prevent focus shift
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  useEffect(() => {
    setTimeout(() => {
      setSelectedValues(activeValues || [])
    }, 0)
  }, [isOpen])


  function handleCheckedChange(value: string) {
    setSelectedValues(selectedValues => {
      if (selectedValues.includes(value)) {
        return selectedValues.filter(selectedValue => selectedValue != value)
      } else {
        return [...selectedValues, value] 
      }
    })
  }

  function handleOnly(value: string) {
    const params = new URLSearchParams(searchParams)
    params.delete(labelLowercase)
    params.set(labelLowercase, value)
    router.replace(`${pathName}?${params.toString()}`, {scroll: false})
    setIsOpen(false)
    setSelectedValues([value])
    setSearchedLetters(undefined)
  }

  function handleApply() {
    const params = new URLSearchParams(searchParams)
    params.delete(labelLowercase)
    for (const selectedValue of selectedValues) {
      params.append(labelLowercase, selectedValue)
    }
    router.replace(`${pathName}?${params.toString()}`, {scroll: false})
    setIsOpen(false)
    setSearchedLetters(undefined)
  }

  function handleRemoveFilter() {
    setSelectedValues([])
  }

  

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className='max-w-80'>
          <Button variant='outline' className={activeValues.length > 0 ? 'bg-accent font-medium' : 'font-normal'}>
            {activeValuesPretty.length === 1
              ? activeValuesPretty
              : activeValuesPretty.length > 1
                ? 'Multiple...'
                : label
            } <ChevronDown />
          </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='flex flex-col gap-5'>

      <ButtonGroup className='mt-1 mx-1'>
          <Input 
            ref={inputRef} 
            className='truncate' 
            // Guard array indexing to satisfy noUncheckedIndexedAccess
            placeholder={`Search for ${(sortedOptions[0] ?? label).toLocaleLowerCase()}...`} 
            onChange={(e) => handleSearch(e)} 
            onKeyDown={(e) => {if (e.key === "Enter") firstSearchResultRef.current?.focus()}}
            defaultValue={searchLetters}
          />
          <Button variant='outline' onClick={() => firstSearchResultRef.current?.focus()}>
            <Search />
          </Button>
      </ButtonGroup>

      <div>
        <DropdownMenuLabel className='text-sm font-medium mb-1 ml-2'>Options</DropdownMenuLabel>
        {hasSearchResults
          ? (
            <DropdownMenuGroup className='flex flex-col gap-2 max-h-80 overflow-auto scroll-auto scroll'>
                {filteredOptions.map((option) => {
                  const optionLowercase = option.toLocaleLowerCase().split(' ').join('-')
                  return (
                    <div className='flex items-center gap-3 mx-1' key={optionLowercase}>
                      <DropdownMenuCheckboxItem
                        ref={filteredOptions.indexOf(option) === 0 ? firstSearchResultRef : undefined}
                        className='grow'
                        checked={selectedValues.includes(optionLowercase)}
                        onCheckedChange={() => handleCheckedChange(optionLowercase)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                      <Button size='sm' variant='outline' className='ml-auto h-6 text-xs' onClick={() => handleOnly(optionLowercase)}>
                        Only
                      </Button>
                    </div>
                  )
                })}
              </DropdownMenuGroup>
          )
          : <p className='flex justify-center text-sm text-accent-foreground p-2'>No options available</p>
        }
      </div>

      <div>
        <DropdownMenuLabel className='text-sm font-medium mb-1 ml-2'>Selected</DropdownMenuLabel>
        {hasSelectedValues
          ? (
              <DropdownMenuGroup className='flex flex-col gap-2 max-h-80 overflow-auto scroll-auto scroll'>
                {selectedValuesPretty.map((option) => {
                  const optionLowercase = option.toLocaleLowerCase().split(' ').join('-')
                  return (
                    <div className='flex items-center gap-3 mx-1' key={optionLowercase}>
                      <DropdownMenuCheckboxItem
                        ref={filteredOptions.indexOf(option) === 0 ? firstSearchResultRef : undefined}
                        className='grow'
                        checked={selectedValues.includes(optionLowercase)}
                        onCheckedChange={() => handleCheckedChange(optionLowercase)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                      <Button size='sm' variant='outline' className='ml-auto h-6 text-xs' onClick={() => handleOnly(optionLowercase)}>
                        Only
                      </Button>
                    </div>
                  )
                })}
              </DropdownMenuGroup>
          )
          : <p className='flex justify-center text-sm text-accent-foreground p-2'>None selected yet</p>
        }
      </div>

        <div className='flex flex-col gap-2 mx-1 mb-1'>
          <div>
            <Button disabled={(!hasSearchResults && selectedValues.length === 0) || hasSelectedAllOptions} className='w-full' onClick={() => handleApply()}>
              {hasSelectedAllOptions 
                ? 'All options selected'
                : <span className='flex gap-2 items-center'>Apply <ArrowRight /></span>
              }
            </Button>
          </div>
          {selectedValues.length > 0 &&
            <>
                <Button className='flex items-center justify-center text-gray-600 font-normal text-sm' variant='ghost' onClick={handleRemoveFilter}>
                  Clear filter
                  <X />
                </Button>
            </>
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { Filter, FilterSelectMultiple}