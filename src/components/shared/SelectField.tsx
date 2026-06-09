export function SelectField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <div className="">
            <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full rounded-full border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option === "All" ? `Choose ${label}...` : option}
                    </option>
                ))}
            </select>
        </div>
    )
}