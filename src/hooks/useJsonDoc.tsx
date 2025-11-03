import { createContext, ReactNode, useContext } from "react";
import invariant from "tiny-invariant";

type BaseJsonDocument = {
  id: string;
  title: string;
  readOnly: boolean;
};

export type RawJsonDocument = BaseJsonDocument & {
  type: "raw";
  contents: string;
};

export type UrlJsonDocument = BaseJsonDocument & {
  type: "url";
  url: string;
};

export type CreateJsonOptions = {
  ttl?: number;
  readOnly?: boolean;
  injest?: boolean;
  metadata?: any;
};

export type JSONDocument = RawJsonDocument | UrlJsonDocument;

type JsonDocType = {
  doc: JSONDocument;
  path?: string;
  minimal?: boolean;
};

const JsonDocContext = createContext<JsonDocType | undefined>(undefined);

export function JsonDocProvider({
  children,
  doc,
  path,
  minimal,
}: {
  children: ReactNode;
  doc: JSONDocument;
  path?: string;
  minimal?: boolean;
}) {
  return (
    <JsonDocContext.Provider value={{ doc, path, minimal }}>
      {children}
    </JsonDocContext.Provider>
  );
}

export function useJsonDoc(): JsonDocType {
  const context = useContext(JsonDocContext);

  invariant(context, "useJsonDoc must be used within a JsonDocProvider");

  return context;
}
