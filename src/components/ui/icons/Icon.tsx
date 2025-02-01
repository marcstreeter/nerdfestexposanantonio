import { Icons } from "./icons.ts";

interface Path {
  d: string;
  class?: string;
}
interface Props {
  name: string;
}

const SvgComponent = (icon: any) => {
  let paths: Path[] = icon.paths || [];
  return (
    <svg
      className={icon.class}
      height={icon.height}
      viewBox={icon.viewBox}
      width={icon.width}
      fill={icon.fill}
      clipRule={icon.clipRule}
      fillRule={icon.fillRule}
      stroke={icon.stroke}
      strokeWidth={icon.strokeWidth}
      strokeLinecap={icon.strokeLinecap}
      strokeLinejoin={icon.strokeLinejoin}
    >
      <title>{icon.title}</title>
      {paths.map((path: Path) => (
        <path d={path.d} className={path.class || ""} />
      ))}
    </svg>
  );
};

export default ({ name }: Props) => {
  let refIcon = (Icons as any)[name] || {};
  return name in Icons ? SvgComponent(refIcon) : null;
};
