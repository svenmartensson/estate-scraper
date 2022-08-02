import { Estate } from "@lib/model";
import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "//localhost:3001";

export interface Estates {
  estates:
    | null
    | Error
    | {
        data: Estate[];
        total: number;
      };
  page: number;
  pageSize: number;
  selectPage: (page: number) => void;
}

export function useEstates(): Estates {
  const [{ estates, page, pageSize }, setState] = useState<State>(() => ({
    estates: null,
    page: 1,
    pageSize: 20,
  }));

  useEffect(() => {
    async function fetchEstates() {
      try {
        const response = await fetch(
          `${API_URL}/estates?page=${encodeURIComponent(
            page
          )}&pageSize=${encodeURIComponent(pageSize)}`
        );
        if (!response.ok) {
          throw new Error(
            `Server responded with status ${response.status} ${response.statusText}`
          );
        }

        const data: Response = await response.json();
        setState((s) => ({
          ...s,
          estates: {
            data: data.estates,
            total: data.count,
          },
        }));
      } catch (err) {
        console.error(err);
        setState((s) => ({
          ...s,
          estates: new Error("Could not load estates"),
        }));
      }
    }

    fetchEstates();
  }, [page, pageSize]);

  const selectPage = useCallback((page: number) => {
    setState((s) => ({
      ...s,
      estates: null,
      page,
    }));
  }, []);

  return { estates, page, pageSize, selectPage };
}

export function totalEstates(
  estates:
    | null
    | Error
    | {
        data: Estate[];
        total: number;
      }
): number {
  if (!estates) return 0;
  if (estates instanceof Error) return 0;
  return estates.total;
}

interface State {
  page: number;
  pageSize: number;
  estates:
    | null
    | Error
    | {
        data: Estate[];
        total: number;
      };
}

interface Response {
  estates: Estate[];
  count: number;
}
