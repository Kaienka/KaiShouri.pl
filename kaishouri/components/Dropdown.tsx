'use client'
import { Field, Label, Select } from '@headlessui/react'
import clsx from 'clsx'

type Props = {
    option: string;
    values: string[];
    onSelect: (value:string) => void,
    value?: string
}

function Dropdown({ option, values, value, onSelect }:Props) {
    return <Field className="flex-column justify-center items-center p-2">
        <Label className="font-mono text-xs font-bold">{option}: </Label>
        <Select name={option} aria-label={option}
            onChange={(e) => onSelect(e.target.value)}
            value={value}
            className={clsx(
                ' p-2 appearance-none rounded-lg border-none bg-third-plum py-1.5 text-xs text-linen-cloud',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                '*:text-linen-cloud'
            )}
        >
            {values && values.map((value) => {
                return <option value={value} key={value} className='text-xs'>{value}</option>
            })}
        </Select>
    </Field>


}

export default Dropdown;