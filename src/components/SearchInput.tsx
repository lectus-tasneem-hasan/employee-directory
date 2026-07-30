import type { ChangeEvent } from 'react'
import './SearchInput.css'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function SearchInput({ value, onChange, placeholder = 'Search by name...' }: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="search-input-wrapper">
      <svg
        className="search-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search employees by name"
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchInput
