export function ContentCard({ h3 = "", p = "" }) {
    return (
        <div className="text-black">
            {h3 && (
                <h3 className="text-lg sm:text-xl font-semibold">{h3}</h3>
            )}
            {p && (
                <p className="text-gray-600 text-sm sm:text-base">{p}</p>
            )}
        </div>
    )
}
