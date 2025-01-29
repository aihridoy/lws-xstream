import React from 'react';
import { getDictionary } from '../dictionaries/dictionaries';

const Banner = async ({ params: { lang } }) => {
    const dict = await getDictionary(lang);

    return (
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {dict.play}, {dict.compete},<br />{dict.follow} {dict.popular}<br />{dict.streamers}
                </h1>
                <p className="text-gray-400 mb-8">{dict.description}</p>
            </div>
            <div className="lg:col-span-2">
                <div className="relative rounded-lg overflow-hidden">
                    <iframe src="https://www.youtube.com/embed/0VtVPk7Zv9c" title="YouTube video player" frameborder="0"
                        className="w-full aspect-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
                        <div className="text-right">
                            <span className="bg-color-purple text-white px-2 py-1 rounded text-sm">{dict.comingSoon}</span>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">04:03</div>
                            <p className="text-sm">{dict.broadcastStartsIn}</p>
                        </div>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">{dict.battleForCastle}</p>
            </div>
        </main>
    );
};

export default Banner;