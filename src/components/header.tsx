import Image from 'next/image'
import flagNeutral from '@/assets/flag-neutral.svg'
import flagComplete from '@/assets/flag-complete.svg'
import flagIncomplete from '@/assets/flag-incomplete.svg'
import sortAsc from '@/assets/sort-asc.svg'
import sortDesc from '@/assets/sort-desc.svg'
import unsorted from '@/assets/unsorted.svg'

import { useHomeContext } from '@/contexts'
import { InputType } from '@/components/sign/commons/element-types'
import { ProfileButtonComponent } from '@/components/user'
import { useEffect, useState, useRef, type ChangeEvent } from 'react'

/**
 * A header component that can be used to filter tasks by status
 * (completed or incomplete), by text and by date or range of dates.
 *
 * @returns {}
 */
export default function HeaderComponent (): React.ReactNode {
  const [search, setSearched] = useState<string>('')
  const searchRef = useRef<string>('')
  const [status, setStatus] = useState<boolean | null>(null)
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const { setQuery, sort, setSort } = useHomeContext()

  useEffect(() => {
    let newQuery = ''

    // SEARCH
    if (search.length > 0) newQuery = `search=${search}&`
    searchRef.current = search

    // COMPLETED
    if (typeof status === 'boolean') {
      newQuery = newQuery + `completed=${status}&`
    }

    // DATE-FROM
    if (dateFrom != null) {
      try {
        const date = new Date(dateFrom).toISOString().split('T')[0]
        newQuery = newQuery + `created_from=${date}&`
      } catch {}
    }

    // DATE-TO
    if (dateTo != null) {
      try {
        const date = new Date(dateTo).toISOString().split('T')[0]
        newQuery = newQuery + `created_to=${date}&`
      } catch {}
    }

    // SORT
    if (sort.length > 0) {
      newQuery =
        newQuery + `ordering=${sort === 'asc' ? 'created' : '-created'}&`
    }

    if (newQuery.length > 0) newQuery = '?' + newQuery.slice(0, -1)

    setQuery(newQuery)
  }, [status, search, dateFrom, dateTo, sort])

  const handleDateFrom = (e: ChangeEvent<HTMLInputElement>): void => {
    setDateFrom(new Date(e.target.value))
  }

  const handleDateTo = (e: ChangeEvent<HTMLInputElement>): void => {
    setDateTo(new Date(e.target.value))
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearched(e.target.value)
  }

  const handleStatusFilter = (): void => {
    if (status === true) {
      setStatus(false)
    } else if (status === false) {
      setStatus(null)
    } else {
      setStatus(true)
    }
  }

  const handleSortMethodChange = (): void => {
    setSort(sort === '' ? 'asc' : sort === 'asc' ? 'desc' : '')
  }

  return (
    <div
      className="
    w-full h-24 sm:h-12
    mb-2 ps-2 pt-2 pe-2
    grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 sm:gap-2
    justify-center
  "
    >
      {/* First row */}
      <div
        className="
      w-full sm:w-auto
      flex gap-2
    "
      >
        {/* Profile button */}
        <div className="mt-auto">
          <ProfileButtonComponent />
        </div>

        {/* Status filter button */}
        <div
          className="
          size-[2.5rem]
          mt-auto
          relative
        "
          onClick={handleStatusFilter}
        >
          <Image
            src={
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              status === true
                ? flagComplete
                : status === false
                  ? flagIncomplete
                  : flagNeutral
            }
            alt="status-filter"
            className="
            absolute
            -bottom-[.1rem]
          "
          />
        </div>

        {/* Text filter input */}
        <input
          id="filter"
          type={InputType.TEXT}
          onChange={handleSearch}
          placeholder="Buscar..."
          className="
          h-full flex-grow
          appearance-none
          text-zinc-100
          bg-transparent
          border-b-2 border-zinc-700
          focus:outline-none
        "
        />
      </div>

      {/* Second row */}
      <div
        className="
      h-full
      flex gap-2
    "
      >
        <div
          className="
        flex-grow
        flex gap-2
      "
        >
          {/* Date from input */}
          <div className="w-[45%]">
            <input
              id="date-from"
              type={InputType.TEXT}
              placeholder="Desde..."
              onChange={handleDateFrom}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              className="
              size-full
              appearance-none
              text-zinc-100
              bg-transparent
              border-b-2 border-zinc-700
              focus:outline-none
          "
            />
          </div>

          {/* Date to input */}
          <div className="w-[45%]">
            <input
              id="date-to"
              type={InputType.TEXT}
              placeholder="Hasta..."
              onChange={handleDateTo}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              className="
            size-full
            appearance-none
            text-zinc-100
            bg-transparent
            border-b-2 border-zinc-700
            focus:outline-none
          "
            />
          </div>

          {/* Sort by date button */}
          <div className="w-[10%] h-full">
            <button className="size-full p-1" onClick={handleSortMethodChange}>
              <Image
                src={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  sort === '' ? unsorted : sort === 'asc' ? sortAsc : sortDesc
                }
                alt="sort-by-date"
                className="size-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
