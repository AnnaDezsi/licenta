import { useState, useEffect } from 'react';
import api from '../../services/axiosConfig';
import { Box, Skeleton } from '@mui/material';


/* style = {
    STRETCH
    CONTAINED
} */

export const AsyncImage = ({ imageId, style = "stretch", width = "full", height = "full" }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await api.get(`/file/${imageId}`, { responseType: 'blob' });

                const imageObjectUrl = URL.createObjectURL(response.data);

                setImageSrc(imageObjectUrl);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [imageId]);

    if (loading) {
        return <Skeleton variant="rectangular" width={`${width === "full" ? '100%' : width}`} height={`${width === "full" ? '400px' : height}`} />

    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return imageSrc ? <Box sx={{
        position: style === 'contained' ? "relative" : "static",
        width: (!!width && width !== "full") ? width : '100%',
        height: (!!height && height !== "full") ? height : '100%',
        overflow: style === 'contained' ? 'hidden' : 'none',
    }}>
        <img
            style={{
                position: style === 'contained' ? "absolute" : "static",
                top: style === 'contained' ? "50%" : 0,
                left: style === 'contained' ? '50%' : 0,
                transform: style === 'contained' ? 'translate(-50%, -50%)' : 'none',
                width: style === 'contained' ? '100%' : '100%',
                height: style === 'contained' ? '100%' : '100%'
            }}
            src={imageSrc}
            alt="Fetched Image" />
    </Box>
        : <div>No image found</div>


};
