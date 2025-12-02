export function ImageCardContent({ image, alt = "Logo" }) {
    if (!image) return null;

    return (
        <div className="flex items-center justify-center p-4">
            <img
                src={image}
                alt={alt}
                className="w-16 h-16 object-contain"
            />
        </div>
    );
}
