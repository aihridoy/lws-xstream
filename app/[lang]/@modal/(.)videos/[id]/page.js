'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import avatar from '/public/avatar.png';
import { useRouter } from 'next/navigation';
import Modal from '@/app/[lang]/components/Modal';
import { getDictionary } from '@/app/[lang]/dictionaries/dictionaries';

const VideoPage = ({ params }) => {
    const router = useRouter();
    const { id, lang } = params;
    const [videos, setVideos] = useState([]);
    const [dict, setDict] = useState({});

    useEffect(() => {
        const loadDict = async () => {
            const dictData = await getDictionary(lang);
            setDict(dictData);
        };
        const loadVideos = async () => {
            const videoData = await import('/data/videos.json');
            setVideos(videoData.default);
        };

        loadDict();
        loadVideos();
    }, [lang]);

    const videoData = videos.find(video => video.videoId === id);

    if (!id) {
        router.push('/app/videos/not-found.js');
        return null;
    }

    return (
        <Modal>
            <main className="flex flex-col">
                <div className="w-full">
                    <div className="relative">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoData?.videoId}`}
                            title={videoData?.title}
                            frameBorder="0"
                            className="w-full aspect-video h-[500px] rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
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
                                <span className="text-sm text-gray-200">46:02</span>
                                <button className="bg-purple-500 hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm">
                                    {dict.donate}
                                </button>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mt-4 text-gray-100">
                        {videoData?.title}
                    </h1>
                    <div className="flex items-center space-x-4 mt-2">
                        <Image
                            src={avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                            width={40}
                            height={40}
                        />
                        <div>
                            <p className="font-semibold text-gray-200">{videoData?.channelTitle}</p>
                        </div>
                        <button className="bg-purple-500 hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm ml-auto">
                            {dict.subscribe}
                        </button>
                    </div>
                </div>
            </main>
        </Modal>
    );
};

export default VideoPage;
