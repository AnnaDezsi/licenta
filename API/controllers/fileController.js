import { GetObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../config/databaseInstance.js";
import { s3 } from "../config/s3bucket.js";

export const getFileById = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await prisma.fileS3.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        const s3Params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: file.name,
        };

        const command = new GetObjectCommand(s3Params);
        const data = await s3.send(command);

        res.setHeader('Content-Type', file.mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);

        data.Body.pipe(res);

    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ error: 'Failed to retrieve file' });
    }
}


