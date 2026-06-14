'use client'
import { Field, Label, Input } from '@headlessui/react'
import clsx from 'clsx'

type Props = {
    option: string;
    onSelect: (value:string) => void;
}

function SearchBar({ option, onSelect }:Props) {
    return <Field className="flex-column justify-center items-center  p-2">
        <Label className="font-mono text-xs font-bold">{option}: </Label>
        <Input type="text" onChange={(e) => onSelect(e.target.value)} 
        className={clsx(
                ' p-2 appearance-none rounded-lg border-none bg-third-plum py-1.5 text-xs text-linen-cloud',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                '*:text-linen-cloud'
            )}
        />
    </Field>


}

export default SearchBar;