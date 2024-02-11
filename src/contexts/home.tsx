import {
  createContext,
  ReactNode,
  useState
} from 'react'


export const HomeContext = createContext({
  status: null as boolean | null,
  setStatus: (value: boolean | null) => { },
  searched: '',
  setSearched: (value: string) => { },
  dateFrom: null as Date | null,
  setDateFrom: (value: Date | null) => { },
  dateTo: null as Date | null,
  setDateTo: (value: Date | null) => { }
})

export interface Props {
  children: ReactNode
}

export default function HomeContextProvider({ children }: Props) {
  const [status, setStatus] = useState<boolean | null>(null)
  const [searched, setSearched] = useState<string>('')
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)

  return <HomeContext.Provider value={{
    status,
    setStatus,
    searched,
    setSearched,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo
  }}>
    {children}
  </HomeContext.Provider>
}
