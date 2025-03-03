import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const sanityClient = () => {
  return createClient({
    apiVersion: "2025-02-06",
    dataset: "production",
    projectId: "hl7szevx",
    useCdn: false,
  });
};

const builder = imageUrlBuilder(sanityClient());

export function urlFor(source: any) {
  return builder.image(source);
}
