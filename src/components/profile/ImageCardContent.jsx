export function ImageCardContent({ image, alt }) {
    return (
        <div className="w-16 h-16 shrink-0">
            {image ? (
                <img 
                    src={image} 
                    alt={alt} 
                    className="w-full h-full object-contain rounded"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                    Sin logo
                </div>
            )}
        </div>
    )
}
