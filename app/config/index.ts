import env from 'react-native-config'

const config = {
    mode: env.MODE,
    imageUrl: env.IMAGE_URL,
    api: {
        url: env.API_URL,
        timeout: 20000,
    }
}

const API_URL = config.api.url;
const MODE = config.mode;
const IMAGE_URL = config.imageUrl;

export {
    API_URL, MODE, IMAGE_URL
}

export default config;