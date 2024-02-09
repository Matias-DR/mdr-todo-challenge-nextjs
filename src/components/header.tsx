import del from '@/assets/actions/del.svg'
import Image from 'next/image'
import plus from '@/assets/actions/plus.svg'

import {
  ButtonType,
  InputType
} from '@/commons/element-types'
import { HomeContext } from '@/contexts'
import { ProfileButtonComponent } from '@/components/user'
import { useContext } from 'react'


export default function HeaderComponent() {
  const {
    setAdd,
    setRemove,
    setSearched,
    setDateFrom,
    setDateTo,
    setIsAllSelected
  } = useContext(HomeContext)

  const handleAdd = () => {
    setAdd(true)
  }

  const handleDel = () => {
    setRemove(true)
  }

  const handleSearch = (e: any) => {
    setSearched(e.target.value)
  }

  const handleDateFrom = (e: any) => {
    setDateFrom(new Date(e.target.value))
  }

  const handleDateTo = (e: any) => {
    setDateTo(new Date(e.target.value))
  }

  const handleSelectAll = (e: any) => {
    setIsAllSelected(!e.target.checked)
  }

  return <div className='w-full h-24 sm:h-12 mb-2 ps-2 pt-2 pe-2 grid sm:gap-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2'>
    <div className='w-full sm:w-auto flex sm:gap-2'>
      <div className='my-auto me-1 sm:me-0'>
        <ProfileButtonComponent />
      </div>
      <div className='w-16'>
        <button
          type={ButtonType.SUBMIT}
          onClick={handleAdd}
          className='h-full flex justify-center items-center py-2 px-4 font-bold text-zinc-100 bg-zinc-700 hover:bg-zinc-800 border-b-2 border-e-2 border-green-400 active:border-0'
        >
          <Image
            src={plus}
            alt='plus'
            className='size-[1.5rem]'
          />
        </button>
      </div>
      <div className='w-16'>
        <button
          type={ButtonType.SUBMIT}
          onClick={handleDel}
          className='h-full flex justify-center items-center py-2 px-4 font-bold text-zinc-100 bg-zinc-700 hover:bg-zinc-800 border-b-2 border-e-2 border-red-400 active:border-0'
        >
          <Image
            src={del}
            alt='del'
            className='size-[1.5rem]'
          />
        </button>
      </div>
      <input
        id='filter'
        type={InputType.TEXT}
        onChange={handleSearch}
        placeholder='Buscar...'
        className='flex-grow h-full text-zinc-100 appearance-none bg-transparent border-b-2 border-zinc-700 focus:outline-none'
      />
    </div>
    <div className='h-full flex gap-2'>
      <div className='w-[45%]'>
        <input
          id='date-from'
          type={InputType.TEXT}
          placeholder='Desde...'
          onChange={handleDateFrom}
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
          className='w-full h-full text-zinc-100 appearance-none bg-transparent border-b-2 border-zinc-700 focus:outline-none'
        />
      </div>
      <div className='w-[45%]'>
        <input
          id='date-to'
          type={InputType.TEXT}
          placeholder='Hasta...'
          onChange={handleDateTo}
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
          className='w-full h-full text-zinc-100 appearance-none bg-transparent border-b-2 border-zinc-700 focus:outline-none'
        />
      </div>
      <div className='w-[10%] flex'>
        <input
          id='select-all'
          type={InputType.CHECK}
          onClick={handleSelectAll}
          className='size-[2rem] ms-auto my-auto'
        />
      </div>
    </div>
  </div>
}
