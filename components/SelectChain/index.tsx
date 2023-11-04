'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { chainIdsToIndices } from '@wharfkit/session';

const chains = Array.from(chainIdsToIndices, ([value, label]) => ({
    value: value.toString(),
    label: label.toString(),
}));

const SelectChain = () => {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between bg-white text-black"
                >
                    {id
                        ? chains
                              .find((chain) => chain.value === id)
                              ?.label
                        : 'Select Chain...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0  bg-white text-black">
                <Command>
                    <CommandInput placeholder="Search Chain..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {chains.map((chain) => (
                            <CommandItem
                                className="cursor-pointer hover:bg-slate-400"
                                key={chain.value}
                                value={chain.label}
                                onSelect={(currentValue) => {
                                    const val = chains
                                        .find(
                                            (chain) =>
                                                chain.label
                                                    .toLowerCase() ===
                                                currentValue.toLowerCase()
                                        )
                                        ?.value;
                                    setId(val ? (val === id ? '' : val) : '');
                                    setOpen(false);
                                }}
                            >
                                <span>{chain.label}</span>
                                <CheckIcon
                                    className={cn(
                                        'ml-auto h-4 w-4',
                                        id === chain.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectChain;