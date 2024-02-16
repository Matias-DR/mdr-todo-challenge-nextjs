import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react'


export const HomeContext = createContext({
  username: '',
  setUsername: (value: string) => { },
  email: '',
  setEmail: (value: string) => { },
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
  username: string
  email: string
  children: ReactNode
}

export default function HomeContextProvider({
  username: _username,
  email: _email,
  children
}: Props) {
  const [username, setUsername] = useState(_username)
  const [email, setEmail] = useState(_email)
  const [status, setStatus] = useState<boolean | null>(null)
  const [searched, setSearched] = useState<string>('')
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)

  return <HomeContext.Provider value={{
    username,
    setUsername,
    email,
    setEmail,
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

export const useHomeContext = () => {
  return useContext(HomeContext)
}

