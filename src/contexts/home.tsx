import { createContext, type ReactNode, useContext, useState } from 'react'

export type Sort = 'asc' | 'desc' | ''

export const HomeContext = createContext({
  username: '',
  setUsername: (value: string) => {},
  email: '',
  setEmail: (value: string) => {},
  query: '',
  setQuery: (value: string) => {},
  sort: 'asc' as Sort,
  setSort: (value: Sort) => {}
})

export interface Props {
  username: string
  email: string
  children: ReactNode
}

export default function HomeContextProvider ({
  username: _username,
  email: _email,
  children
}: Props): React.ReactNode {
  const [username, setUsername] = useState(_username)
  const [email, setEmail] = useState(_email)
  const [query, setQuery] = useState<string>('')
  const [sort, setSort] = useState<Sort>('')

  return (
    <HomeContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        query,
        setQuery,
        sort,
        setSort
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export const useHomeContext = (): {
  username: string
  setUsername: (value: string) => void
  email: string
  setEmail: (value: string) => void
  query: string
  setQuery: (value: string) => void
  sort: Sort
  setSort: (value: Sort) => void
} => {
  return useContext(HomeContext)
}
