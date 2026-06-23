export default function MainButton({
    label,
    icon,
    onClick,
    variant='primary',
}: {
    label: string
    icon?: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary'
}) {
    return(
        <button onClick={onClick} className={` ${variant === 'primary' ? 'bg-[#135576] hover:bg-[#0a3850] text-white' : 'bg-[#EFF1F4] hover:bg-[#c8c8c9] text-black/70'} font-medium py-2 px-4 rounded-full w-fit cursor-pointer text-sm md:text-base flex items-center ${icon ? 'gap-2': 'justify-center'}`}>
            {icon && icon}{label}
            </button>
    )
}