declare module ".contentlayer/generated" {
  export interface ContentBody {
    raw: string;
    code: string;
  }

  export interface ContentDocument {
    _id: string;
    _raw: {
      flattenedPath: string;
      sourceFilePath: string;
    };
    type: string;
    title: string;
    description?: string;
    slug: string;
    slugAsParams: string;
    body: ContentBody;
  }

  export interface Doc extends ContentDocument {
    published?: boolean;
  }

  export interface Post extends ContentDocument {
    date: string;
    published?: boolean;
    image: string;
    authors: string[];
  }

  export interface Author extends ContentDocument {
    twitter: string;
    avatar: string;
  }

  export const allDocs: readonly Doc[];
  export const allPosts: readonly Post[];
  export const allAuthors: readonly Author[];
}
