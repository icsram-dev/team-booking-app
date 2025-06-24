import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_NAME } from "../constants/cloudinary";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_NAME
  }
});

export default cloudinary;