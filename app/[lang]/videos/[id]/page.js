'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import avatar from '/public/avatar.png';
import NotFound from './not-found';
import { getDictionary } from '../../dictionaries/dictionaries';

const VideoPage = ({ params }) => {
    const { id, lang } = params;
    const [videos, setVideos] = useState([]);
    const [dict, setDict] = useState({});
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        const loadDict = async () => {
            const dictData = await getDictionary(lang);
            setDict(dictData);
        };

        const loadVideos = async () => {
            const videoData = await import('/data/videos.json');
            setVideos(videoData.default);
            const video = videoData.default.find((video) => video.videoId === id);
            setVideoData(video);
        };

        loadDict();
        loadVideos();
    }, [id, lang]);

    if (!videoData && videos.length > 0) {
        return <NotFound message={`This video with "${id}" id was not found!`} />;
    }

    return (
        <div className="w-full min-h-screen bg-color-bg text-white font-exo">
            <main className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="lg:w-3/4">
                    <div className="relative">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoData?.videoId}`}
                            title={videoData?.title}
                            frameBorder="0"
                            className="w-full aspect-video h-[500px]"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <div className="flex items-center space-x-4">
                                <button className="bg-gray-800 hover:bg-opacity-80 rounded-full p-2">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </button>
                                <div className="bg-purple-500 text-white px-2 py-1 rounded text-sm">{dict.live}</div>
                                <span className="text-sm">46:02</span>
                                <button className="bg-purple-500 hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm">
                                    {dict.donate}
                                </button>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mt-4">{videoData?.title}</h1>
                    <div className="flex items-center space-x-4 mt-2">
                        <Image
                            src={avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                            width={200}
                            height={200}
                        />
                        <div>
                            <p className="font-semibold">{videoData?.channelTitle}</p>
                        </div>
                        <button className="bg-purple-500 hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm ml-auto">
                            {dict.subscribe}
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/4">
                    <h2 className="text-xl font-semibold mb-4">{dict.youMayLike}</h2>
                    <div className="space-y-6">
                        {videos.slice(0, 4).map((video) => (
                            <div
                                key={video?.videoId}
                                className="flex items-start space-x-4 bg-gray-800 p-3 rounded-lg hover:shadow-md hover:bg-gray-700 transition duration-200"
                            >
                                <Image
                                    src={video?.thumbnail}
                                    alt={video?.title}
                                    className="w-32 h-20 rounded-md object-cover"
                                    width={128}
                                    height={80}
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-white line-clamp-2">{video?.title}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{video?.channelTitle}</p>
                                    <p className="text-sm text-gray-400">26,389M</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VideoPage;
