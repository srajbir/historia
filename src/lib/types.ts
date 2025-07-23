export const allowedCollections: string[] = ['figures', 'events', 'locations', 'dynasties', 'eras'];

export type Props = {
  id: string;
  name: string;
  image: string;
  description: string;

  era?: string | null;
  founder?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  location?: string | null;
  dynasty?: string | null;
  date?: number | null;
  role?: string | null;
};

export type CardProps = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

export type ErrorResult = {
  error: string;
  status: number;
};