type SelectOption = string | {
  id?: number;
  category?: number;
  category_name?: string;
  name?: string;
  created_at?: string;
};

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: string | number) => void;
}

export function SelectField({
  label,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
        {label}
      </label>

      <select
        value={typeof value === "string" ? value : value?.id}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
      >
        {options.map((option) => {

          // if option is string
          if (typeof option === "string") {
            return (
              <option key={option} value={option}>
                {option === "All"
                  ? `Choose ${label}...`
                  : option}
              </option>
            );
          }

          // if option is object
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}