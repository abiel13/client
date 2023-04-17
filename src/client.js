import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "rmi5bdl4",
  dataset: "production",
  apiVersion: "2021-10-01",
  useCdn: true,
  token:
    "skzwJZXOsgyfW4PcPrIwVGYq2hxSQqzNkIQtMucAFbWctzKYsDHgpPgapWmDChzs7RmPVqJVLYr9Yo9O87DdfL1sE3Jf2vlZiKfxSLCvn9FQIUfgjLCwJnq4EjjOCQeNpctmCDRXOaKa5kmoCbn8tHzEEOGJ8yzr1blu7dmouebx0giOp69j",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
