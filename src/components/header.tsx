import Image from 'next/image'
import flagNeutral from '@/assets/flag-neutral.svg'
import flagComplete from '@/assets/flag-complete.svg'
import flagIncomplete from '@/assets/flag-incomplete.svg'

import { HomeContext } from '@/contexts'
import { InputType } from '@/commons/element-types'
import { ProfileButtonComponent } from '@/components/user'
import {
  ReactNode,
  useContext,
  useState
} from 'react'


/**
 * A header component that can be used to filter tasks by status
 * (completed or incomplete), by text and by date or range of dates.
 * 
 * @returns {}
 */
export default function HeaderComponent(): ReactNode {
  const {
    setSearched,
    setDateFrom,
    setDateTo,
    status,
    setStatus
  } = useContext(HomeContext)

  const handleDateFrom = (e: any) => {
    setDateFrom(new Date(e.target.value))
  }

  const handleDateTo = (e: any) => {
    setDateTo(new Date(e.target.value))
  }

  const handleSearch = (e: any) => {
    setSearched(e.target.value)
  }

  const handleStatusFilter = () => {
    if (status === true) {
      setStatus(false)
    } else if (status === false) {
      setStatus(null)
    } else {
      setStatus(true)
    }
  }

  return <div className='
    w-full h-24 sm:h-12
    mb-2 ps-2 pt-2 pe-2
    grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 sm:gap-2
    justify-center
  '>

    {/* First row */}
    <div className='
      w-full sm:w-auto
      flex gap-2
    '>

      {/* Profile button */}
      <div className='mt-auto'>
        <ProfileButtonComponent />
      </div>

      {/* Status filter button */}
      <div
        className='
          size-[2.5rem]
          mt-auto
          relative
        '
        onClick={handleStatusFilter}
      >
        <Image
          src={
            status === true ?
              flagComplete :
              status === false ?
                flagIncomplete :
                flagNeutral
          }
          alt='status-filter'
          className='
            absolute
            -bottom-[.1rem]
          '
        />
      </div>

      {/* Text filter input */}
      <input
        id='filter'
        type={InputType.TEXT}
        onChange={handleSearch}
        placeholder='Buscar...'
        className='
          h-full flex-grow
          appearance-none
          text-zinc-100
          bg-transparent
          border-b-2 border-zinc-700
          focus:outline-none
        '
      />

    </div>

    {/* Second row */}
    <div className='
      h-full
      flex gap-2
    '>
      <div className='
        flex-grow
        flex gap-2
      '>

        {/* Date from input */}
        <div className='w-1/2'>
          <input
            id='date-from'
            type={InputType.TEXT}
            placeholder='Desde...'
            onChange={handleDateFrom}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            className='
              size-full
              appearance-none
              text-zinc-100
              bg-transparent
              border-b-2 border-zinc-700
              focus:outline-none
          '/>
        </div>

        {/* Date to input */}
        <div className='w-1/2'>
          <input
            id='date-to'
            type={InputType.TEXT}
            placeholder='Hasta...'
            onChange={handleDateTo}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            className='
            size-full
            appearance-none
            text-zinc-100
            bg-transparent
            border-b-2 border-zinc-700
            focus:outline-none
          '/>
        </div>

      </div>
    </div>
  </div>
}
