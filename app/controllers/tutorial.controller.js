import axios from 'axios';
import AWS from 'aws-sdk'
AWS.config.update({
    accessKeyId: 'AKIASTWZGZCRYUPPBK7E',
    secretAccessKey: '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',
    region: 'us-east-1',
});

// Create an S3 client
const s3 = new AWS.S3();
exports.generateDocument = async (req, res) => {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    const axiosInstance = axios.create();
    axiosInstance.defaults.timeout = 1000000;

    const userId = req.body.userId;
    const data = req.body.data;
    const APIs = req.body.APIs;

    try {
        const pdfResponse = await axios.post(APIs.CHAT_PDF.GENERATE_PDF + userId, JSON.stringify(data), { timeout: 1200000, responseType: 'arraybuffer' });
        console.log(pdfResponse)
        const s3Params = {
            Bucket: 'augier-documents',
            Key: `PPM-${userId}.pdf`,
            Body: Buffer.from(pdfResponse.data, 'binary'),
            ContentType: 'application/pdf',
        };
        await s3.upload(s3Params).promise();
        res.status(200).json({ message: 'PDF saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving PDF', data: error });
    }
}
