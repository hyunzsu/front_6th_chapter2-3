import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui/select"

interface FilterOption {
  value: string
  label: string
}

interface FilterSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  options: FilterOption[]
  disabled?: boolean
  width?: string
}

export const FilterSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
  disabled = false,
  width = "w-[180px]",
}: FilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
