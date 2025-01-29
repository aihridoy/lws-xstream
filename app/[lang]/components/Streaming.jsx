'use client'

import React, { useEffect, useState } from "react";
import StreamingCard from "./StreamingCard";
import Link from "next/link";
import { getDictionary } from "../dictionaries/dictionaries";

const Streaming = ({ params: { lang } }) => {
    const [videos, setVideos] = useState([]);
    const [dict, setDict] = useState({});

    useEffect(() => {
        const loadDict = async () => {
            const dictData = await getDictionary(lang);
            setDict(dictData);
        };

        const loadVideos = async () => {
            const videoData = await import("/data/videos.json");
            setVideos(videoData.default);
        };

        loadDict();
        loadVideos();
    }, [lang]);

    return (
        <section className="mt-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{dict.streamsOfTheDay}</h2>
                <a
                    href="#"
                    className="bg-color-gray hover:bg-opacity-80 text-sm px-4 py-2 rounded-full"
                >
                    {dict.viewAll}
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videos.map((video) => (
                    <Link key={video.videoId} href={`/videos/${video.videoId}`}>
                        <StreamingCard key={video.videoId} video={video} />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Streaming;
