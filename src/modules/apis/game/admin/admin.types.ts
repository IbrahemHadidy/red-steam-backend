import type { File } from '@nest-lab/fastify-multer';

export interface CreateData {
  name: string;
  category: string;
  description: string;
  releaseDate: Date;
  featured: boolean;
  publishers: number[];
  developers: number[];
  thumbnailEntries: {
    mainImage: File;
    backgroundImage: File;
    menuImg: File;
    horizontalHeaderImage: File;
    verticalHeaderImage: File;
    smallHeaderImage: File;
    searchImage: File;
    tabImage: File;
  };
  imageEntries: {
    image: File;
    order: number;
    featured?: boolean;
  }[];
  videoEntries: {
    video: File;
    poster: File;
    order: number;
  }[];
  pricing: {
    free: boolean;
    basePrice?: number;
  };
  tags: number[];
  features: number[];
  languages: {
    name: string;
    interface: boolean;
    fullAudio: boolean;
    subtitles: boolean;
  }[];
  platformEntries: {
    win: boolean;
    mac: boolean;
  };
  systemRequirements: {
    req64?: boolean;
    mini: {
      os?: string;
      cpu?: string;
      ram?: string;
      gpu?: string;
      dx?: string;
      network?: string;
      storage?: string;
      additionalNotes?: string;
      soundCard?: string;
      vrSupport?: string;
    };
    recommended: {
      os?: string;
      cpu?: string;
      ram?: string;
      gpu?: string;
      dx?: string;
      network?: string;
      storage?: string;
      additionalNotes?: string;
      soundCard?: string;
      vrSupport?: string;
    };
  };
  link?: string;
  about: string;
  mature: boolean;
  matureDescription?: string;
  legal?: string;
}

export interface UpdateData {
  id: number;
  name: string;
  category?: string;
  description?: string;
  releaseDate?: Date;
  featured?: boolean;
  publishers?: number[];
  developers?: number[];
  changedThumbnails?: {
    mainImage?: File;
    backgroundImage?: File;
    menuImg?: File;
    horizontalHeaderImage?: File;
    verticalHeaderImage?: File;
    smallHeaderImage?: File;
    searchImage?: File;
    tabImage?: File;
  };
  deletedScreenshots?: number[];
  deletedVideos?: number[];
  changedScreenshots?: { oldOrder: number; newOrder: number }[];
  changedVideos?: { oldOrder: number; newOrder: number }[];
  addedScreenshots: {
    image: File;
    order: number;
    featured?: boolean;
  }[];
  addedVideos: {
    video: File;
    poster: File;
    order: number;
  }[];
  featuredOrders?: number[];
  pricing?: {
    free?: boolean;
    basePrice?: number;
  };
  tags?: number[];
  features?: number[];
  languages?: {
    name: string;
    interface: boolean;
    fullAudio: boolean;
    subtitles: boolean;
  }[];
  platformEntries?: {
    win: boolean;
    mac: boolean;
  };
  systemRequirements?: {
    req64?: boolean;
    mini: {
      os?: string;
      cpu?: string;
      ram?: string;
      gpu?: string;
      dx?: string;
      network?: string;
      storage?: string;
      additionalNotes?: string;
      soundCard?: string;
      vrSupport?: string;
    };
    recommended: {
      os?: string;
      cpu?: string;
      ram?: string;
      gpu?: string;
      dx?: string;
      network?: string;
      storage?: string;
      additionalNotes?: string;
      soundCard?: string;
      vrSupport?: string;
    };
  };
  link?: string;
  about?: string;
  mature?: boolean;
  matureDescription?: string;
  legal?: string;
}
