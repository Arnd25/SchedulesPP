'use client'

import { ChakraProvider, createSystem, defaultConfig, defaultSystem } from '@chakra-ui/react'
import { useServerInsertedHTML } from 'next/navigation'
import { ReactNode, useState } from 'react'
import createCache, { Options } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: '#327440' },
        secondary: { value: '#4BBA62' },
        card: { value: '#CCFFD9' },
      },
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'chakra' } as Options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}