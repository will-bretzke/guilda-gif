import axios from "axios";

interface IRequest {
    gif: string;
    apiKey: string;
}

interface IResponse {
    data: object[];
    pagination?: object;
    meta: object;
}

export default class GetGifsUseCase {
    API_GIPHY_URL = "https://api.giphy.com/v1/gifs/search";

    async execute({ gif, apiKey }: IRequest): Promise<object | null> {
        const url = `${this.API_GIPHY_URL}?api_key=${apiKey}&q=${gif}&limit=50`;

        try {
            const response = (await axios.get(url)) as IResponse;
            let max = response["data"].length;
            let index: string;
            let gifs = {};

            while (Object.keys(gifs).length < 5 && max > 0) {
                index = Math.floor(Math.random() * max).toString();
                if (Object.keys(gifs).indexOf(index) < 0)
                    gifs[index] = response["data"][index]["images"]["original"];
            }

            if (Object.keys(gifs).length > 0) {
                return gifs;
            }

            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
