import fs from 'fs';
import path from 'path';

const videosFilePath = path.join(process.cwd(), '/data/videos.json');
const videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));

export async function GET(req, { params }) {
    const { id } = params;
    const video = videos.find((video) => video.videoId === id);

    if (!video) {
        return new Response(JSON.stringify({ error: 'Video not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(video), { status: 200 });
}

export async function PATCH(req, { params }) {
    const { id } = params;
    const videoIndex = videos.findIndex((video) => video.videoId === id);

    if (videoIndex === -1) {
        return new Response(JSON.stringify({ error: 'Video not found' }), { status: 404 });
    }

    const updatedFields = await req.json();

    if (!updatedFields.title && !updatedFields.description) {
        return new Response(JSON.stringify({ error: 'Only title and description can be updated' }), { status: 400 });
    }

    const updatedVideo = { ...videos[videoIndex], ...updatedFields };

    videos[videoIndex] = updatedVideo;
    fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

    return new Response(JSON.stringify(updatedVideo), { status: 200 });
}

export async function DELETE(req, { params }) {
    const { id } = params;
    const videoIndex = videos.findIndex((video) => video.videoId === id);

    if (videoIndex === -1) {
        return new Response(JSON.stringify({ error: 'Video not found' }), { status: 404 });
    }

    videos.splice(videoIndex, 1);
    fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

    return new Response(
        JSON.stringify({ message: 'Video deleted successfully' }),
        { status: 200 }
    );
}
