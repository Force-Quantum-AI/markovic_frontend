"use client"

type DropdownOption = {
  id: number;
  name: string;
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  classes?: string;
  disabled?: boolean;
}

const statusOptions: DropdownOption[] = [
  { id: 1, name: "Upcoming" },
  { id: 2, name: "Held" },
  { id: 3, name: "Postponed" },
];

export function SelectFieldForStatus({
  label,
  value,
  onChange,
  classes,
  disabled = false,
}: SelectFieldProps) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={
        classes ??
        "w-full px-5 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer transition-all shadow-sm"
      }
    >
      <option value="">Select {label}</option>

      {statusOptions.map((option) => (
        <option key={option.id} value={String(option.id)}>
          {option.name}
        </option>
      ))}
    </select>
  );
}