import React from 'react';
import { Helmet } from 'react-helmet-async';

const DocumentHead = ({ title, description, slug }) => {
    const baseUrl = 'https://littlehugs.vercel.app';
    const imageUrl = 'https://littlehugs.vercel.app/og-image.png';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={`${baseUrl}${slug}`} />
            <meta property="og:type" content="website" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default DocumentHead;