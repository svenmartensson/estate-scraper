import { Estate } from "@lib/model";
import { EstateTile } from "../EstateTile";
import "./style.css";

export interface EstateGridProps {
  estates:
    | null
    | Error
    | {
        data: Estate[];
        total: number;
      };
  pageSize: number;
}

export function EstateGrid(props: EstateGridProps) {
  const { estates, pageSize } = props;
  return (
    <div className="estate-grid">
      {estates instanceof Error ? (
        <div>{estates.message}</div>
      ) : estates === null || estates.data.length < 1 ? (
        <div>No estates found</div>
      ) : (
        estates.data.map((estate) => (
          <EstateTile key={estate.id} estate={estate} />
        ))
      )}
    </div>
  );
}
