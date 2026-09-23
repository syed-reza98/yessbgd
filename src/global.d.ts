/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*?url" {
  const content: string;
  export default content;
}
