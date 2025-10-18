const apiConfig = {
    baseURL: "https://api.themoviedb.org/3",
    apiKey: "9933462238e4e1bef6e103946722df35",
    originalImage: (imgPath) => imgPath ? `https://image.tmdb.org/t/p/original/${imgPath}` : '/fallback-image.jpg',
    w500Image: (imgPath) => imgPath ? `https://image.tmdb.org/t/p/w500/${imgPath}` : '/fallback-image.jpg',
};

export default apiConfig;