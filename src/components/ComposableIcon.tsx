import { spritesheetMapping } from "../data/atlas-config.ts";
import { useComposableIcons } from "../hooks/useComposableIcons.tsx";

type ComposableIconsProps = {
  iconConfig: string[];
};

export const ComposableIcon = ({ iconConfig }: ComposableIconsProps) => {
  const sheetConfig = useComposableIcons();

  return (
    <div className="composableIcon">
      {iconConfig.map((iconId) => {
        const iconPosition = spritesheetMapping[iconId]
          .map((position) => position * -sheetConfig.spriteSize + "px")
          .join(" ");

        return (
          <div
            className="iconPiece"
            style={{
              backgroundImage: `url(${sheetConfig.source})`,
              backgroundSize: 100 * sheetConfig.numberOfColumns + "%",
              backgroundPosition: iconPosition,
            }}
          ></div>
        );
      })}
    </div>
  );
};
