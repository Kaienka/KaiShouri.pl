"use client";
import sort from "@/dicts/sort";
import FilterChip from "@/components/filters/FilterChip";

type Props = {
  value: string;
  onSort: (value: string) => void;
};

function SortBy({ value, onSort }: Props) {
  return <FilterChip label="Sortuj" options={sort} value={value} onChange={onSort} neutral variant="field" />;
}

export default SortBy;
