import { notFound } from 'next/navigation';

export default function CatchAllPage({ params }) {
    const { catchAll } = params;
    return notFound();
}
