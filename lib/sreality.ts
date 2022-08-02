import axios from "axios";
import { Estate } from "./model";

const ESTATES_URL =
  process.env.ESTATES_URL ||
  "https://www.sreality.cz/api/en/v2/estates?category_main_cb=1&category_type_cb=1&page=1&per_page=500";

export async function downloadEstates(): Promise<SrealityEstate[]> {
  const response = await axios.get<EstatesResponse>(ESTATES_URL);
  return response.data._embedded.estates.map(toEstate);
}

function toEstate(srEstate: ResponseEstate, order: number): SrealityEstate {
  return {
    name: srEstate.name,
    locality: srEstate.locality,
    order,
    thumbnail: srEstate._links.images[0].href,
  };
}

interface EstatesResponse {
  _embedded: {
    estates: ResponseEstate[];
  };
}

export type SrealityEstate = Omit<Estate, "id">;

interface ResponseEstate {
  name: string;
  locality: string;
  _links: {
    images: { href: string }[];
  };
}
