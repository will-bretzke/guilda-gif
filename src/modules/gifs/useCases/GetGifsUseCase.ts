import axios from "axios";

interface IRequest {
  gif: string;
  apiKey: string;
}

interface IGifResponse {
  frames: string;
  hash: string;
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface IResponse {
  data: {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: string;
    trending_datetime: string;
    images: {
      original: IGifResponse;
    };
    user: object;
    analytics_response_payload: string;
    analytics: object;
  }[];
  pagination?: object;
  meta: object;
}

export default class GetGifsUseCase {
  API_GIPHY_URL = "https://api.giphy.com/v1/gifs/search";

  async execute({ gif, apiKey }: IRequest): Promise<IGifResponse[] | null> {
    const url = `${this.API_GIPHY_URL}fefef?api_key=${apiKey}&q=${gif}&limit=50`;

    try {
      const response = (await axios.get(url)).data as IResponse;
      let max = response["data"].length;

      let index: number;
      let gifs: IGifResponse[] = [];

      while (Object.keys(gifs).length < 5 && max > 0) {
        index = Math.floor(Math.random() * max);
        const gif = response?.data[index]["images"]["original"] as IGifResponse;
        if (!gifs.includes(gif)) gifs.push(gif);
      }

      if (Object.keys(gifs).length > 0) {
        return gifs;
      }
    } finally {
      return null;
    }
  }
}
