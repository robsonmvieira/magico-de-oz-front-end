

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
}


interface SelectPopoverProps {
  label: string
  options: Status[]
  onValueChange?: (value: string) => void
}

export function SelectPopover({ label, options, onValueChange }: Readonly<SelectPopoverProps>) {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(
    null
  )

  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className=" justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Escolher {label}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      const selected = options.find((priority) => priority.value === value) || null
                      setSelectedStatus(selected)
                      setOpen(false)
                      if (onValueChange) {
                        onValueChange(value)
                      }
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
