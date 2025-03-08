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
  // if (!source || !source.asset || !source.assets?._ref) {
  //   console.warn("urlFor received invalid source:", source);
  //   return {
  //     url: () =>
  //       "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   }; // Fallback placeholder
  // }
  return builder.image(source);
}
