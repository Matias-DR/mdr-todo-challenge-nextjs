import {
  createContext,
  ReactNode,
  useEffect,
  useState
} from 'react'


export const HomeContext = createContext({
  isAllSelected: false,
  setIsAllSelected: (value: boolean) => { },
  searched: '',
  setSearched: (value: string) => { },
  dateFrom: null as Date | null,
  setDateFrom: (value: Date | null) => { },
  dateTo: null as Date | null,
  setDateTo: (value: Date | null) => { },
  remove: false,
  setRemove: (value: boolean) => { },
  add: false,
  setAdd: (value: boolean) => { }
})

export interface Props {
  children: ReactNode
}

export default function HomeContextProvider({ children }: Props) {
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [searched, setSearched] = useState('')
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)
  const [remove, setRemove] = useState(false)
  const [add, setAdd] = useState(false)

  return <HomeContext.Provider value={{
    isAllSelected,
    setIsAllSelected,
    searched,
    setSearched,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    remove,
    setRemove,
    add,
    setAdd
  }}>
    {children}
  </HomeContext.Provider>
}
