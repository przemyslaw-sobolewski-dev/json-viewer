import { JSONStringType } from "@jsonhero/json-infer-types/lib/@types";
import { Body } from "../../../components/Primitives/Body";
import { PreviewBox } from "../PreviewBox";

export type PreviewUriProps = {
  value: string;
  type: JSONStringType;
};

export function PreviewUri(props: PreviewUriProps) {
  // Simplified version without server-side fetching
  // Just display the URI as a clickable link
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const isUrl = isValidUrl(props.value);

  return (
    <div>
      <PreviewBox>
        <Body>
          {isUrl ? (
            <a
              href={props.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              {props.value}
            </a>
          ) : (
            <span>{props.value}</span>
          )}
        </Body>
      </PreviewBox>
    </div>
  );
}
