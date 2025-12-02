export function ContentCard({ h3 = "", p = "" }) {
    return (
        <div className="text-black text-center px-4">
            {h3 && (
                <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold">
                    {h3}
                </h3>
            )}

            {p && (
                <p className="text-lg sm:text-xl font-medium text-left">
                    {p}
                </p>
            )}
        </div>
    );
}
