import { NextResponse } from 'next/server';
import videos from '/data/videos.json';

export async function GET(request) {
    try {
        return NextResponse.json(videos, { status: 200 });
    } catch (error) {
        console.error('Error fetching videos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch videos' },
            { status: 500 }
        );
    }
}
