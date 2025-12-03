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
{/* <div className="flex items-start gap-4"> */}
        {/* Logo de la empresa */}
        {/* <div className="shrink-0 w-20 h-20 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
          {data.logoUrl ? (
            <img 
              src={data.logoUrl} 
              alt={data.empresa}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-12 h-12 bg-purple-600 rounded-full" />
          )}
</div> */}