export type Post<T extends string = 'post'> = {
  type: T;
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  parent: number;
  slug: string;
  status: string;
  link: string;
  title: {
    raw: string;
    rendered: string;
  };
  guid: {
    raw: string;
    rendered: string;
  };
  excerpt: {
    raw: string;
    rendered: string;
  };
  content: {
    raw: string;
    rendered: string;
  };
}