'use client'

import * as React from 'react'
import { Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'

interface CompanySuggestion {
  name: string
  domain: string
  logo?: string
}

interface CompanyAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function CompanyAutocomplete({
  value,
  onChange,
  placeholder = 'paste your URL',
  className,
}: CompanyAutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [suggestions, setSuggestions] = React.useState<CompanySuggestion[]>([])

  // Debounced input detection
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (value.length > 2) {
        fetchSuggestions(value)
      } else {
        setSuggestions([])
        setOpen(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [value])

  const fetchSuggestions = (query: string) => {
    const newSuggestions: CompanySuggestion[] = []

    // Extract domain from various formats (https://, www., etc.)
    const domainMatch = query.match(/(?:https?:\/\/)?(?:www\.)?([^\/\s]+)/i)
    const domain = domainMatch ? domainMatch[1] : query

    if (domain.includes('.')) {
      // If user already typed a TLD, show it
      newSuggestions.push({
        name: domain,
        domain: domain,
      })
    } else {
      // If no TLD yet, suggest common ones
      const commonTLDs = ['.com', '.ai', '.io', '.co']
      commonTLDs.forEach((tld) => {
        newSuggestions.push({
          name: `${domain}${tld}`,
          domain: `${domain}${tld}`,
        })
      })
    }

    setSuggestions(newSuggestions)
    setOpen(newSuggestions.length > 0)
  }

  const getFaviconUrl = (domain: string) => {
    // Clean domain and use Google's favicon service
    const cleanDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
    return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=32`
  }

  const handleSelect = (suggestion: CompanySuggestion) => {
    // Format as full URL
    const formattedUrl = suggestion.domain.startsWith('http')
      ? suggestion.domain
      : `https://${suggestion.domain}`
    onChange(formattedUrl)
    setOpen(false)
  }

  return (
    <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              'w-full text-lg px-6 py-7 rounded-xl border-2 border-border',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              'transition-all duration-200',
              className
            )}
            onFocus={() => {
              if (suggestions.length > 0) setOpen(true)
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-full"
        align="start"
        sideOffset={4}
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command>
          <CommandList>
            <CommandEmpty>No suggestions found.</CommandEmpty>
            <CommandGroup>
              {suggestions.map((suggestion, index) => (
                <CommandItem
                  key={index}
                  value={suggestion.domain}
                  onSelect={() => handleSelect(suggestion)}
                  className="flex items-center gap-3 py-3 px-4 cursor-pointer"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded bg-muted flex-shrink-0">
                    <img
                      src={getFaviconUrl(suggestion.domain)}
                      alt=""
                      className="w-6 h-6"
                      onError={(e) => {
                        // Fallback to building icon if logo fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent && !parent.querySelector('svg')) {
                          const icon = document.createElement('div')
                          icon.innerHTML = `
                            <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          `
                          parent.appendChild(icon.firstElementChild!)
                        }
                      }}
                    />
                  </div>
                  <span className="text-base">{suggestion.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
