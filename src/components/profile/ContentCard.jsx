export function ContentCard({ 
    h3 = "",     
    h4 = "",
    p = "", 
    p1 = "",
    p2 = ""
}) {
    return (
        <div className="text-black">
            {h3 && (
                <h3 className="text-md sm:text-xl font-normal">{h3}</h3>
            )}
            {h4 && (
                <h4 className="text-lg sm:text-xl font-semibold">{h4}</h4>
            )}
            {p && (
                <p className="text-gray-800 text-sm sm:text-base">{p}</p>
            )}
            {p1 && (
                <p className="text-gray-400 text-sm sm:text-base">{p1}</p>
            )}
            {p2 && (
                <p className="text-gray-800 text-sm sm:text-base">{p2}</p>
            )}            
        </div>
    )
}
