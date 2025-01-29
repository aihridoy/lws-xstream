import Image from "next/image";
import React from "react";

const StreamingCard = ({ video }) => {
    return (
        <div className="rounded-lg overflow-hidden bg-color-gray">
            <Image
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover"
                width={400}
                height={200}
            />
            <div className="p-2">
                <p className="font-semibold">{video.title}</p>
                <p className="text-sm text-gray-400">{video.channelTitle}</p>
            </div>
        </div>
    );
};

export default StreamingCard;
