import { Estate } from "@lib/model";
import "./style.css";

export interface EstateTileProps {
  estate: Estate;
}

export function EstateTile(props: EstateTileProps) {
  const {
    estate: { name, locality, thumbnail },
  } = props;

  return (
    <div className="estate-tile">
      <div className="estate-tile__thumb">
        <img alt={`Preview of ${name}`} src={thumbnail} />
      </div>
      <div className="estate-tile__content">
        <div className="estate-tile__name">{name}</div>
        <div className="estate-tile__loc">{locality}</div>
      </div>
    </div>
  );
}
