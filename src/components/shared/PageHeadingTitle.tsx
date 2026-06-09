export function PageHeadingTitle(
    {title, subtitle }: { title: string; subtitle?: string }
) {
    return (
        <div className="pb-4">
            <h1 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-gray-900">
                {title}
            </h1>

            {
                subtitle && (
                    <p className="text-xs md:text-sm text-gray-500">
                        {subtitle}
                    </p>
                )
            }
        </div>
    );
}