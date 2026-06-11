export function InputField({ 
    label, 
    icon, 
    placeholder = 'Search here...', 
    value = '', 
    onChange 
}: { label?: string; icon?: React.ReactNode; placeholder: string; value?: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="">
            {label &&
                <label className="ml-1 mb-1 block text-xs font-medium text-gray-500">
                    {label}
                </label>
            }
            <div className="relative flex items-center gap-2 w-full rounded-full border border-gray-200 bg-gray-100 py-2.5 pl-4 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#135576] focus:outline-none focus:ring-1 focus:ring-[#135576]">
                {icon && icon}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent border-none outline-none focus:ring-0 focus:border-0"
                />
            </div>
        </div>
    )
}
