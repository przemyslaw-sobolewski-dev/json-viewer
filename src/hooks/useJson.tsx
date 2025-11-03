import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import invariant from "tiny-invariant";
import { stableJson } from "../utilities/stableJson";

type JsonContextType = [unknown, Dispatch<SetStateAction<unknown>>];

const JsonContext = createContext<JsonContextType | undefined>(undefined);

export function JsonProvider({
  children,
  initialJson,
  onChange,
}: {
  children: ReactNode;
  initialJson: unknown;
  onChange?: (newJson: unknown) => void;
}) {
  const stablizedJson = useMemo(() => stableJson(initialJson), [initialJson]);

  const [json, setJson] = useState<unknown>(stablizedJson);

  useEffect(() => {
    if (onChange) {
      onChange(json);
    }
  }, [json, onChange]);

  return (
    <JsonContext.Provider value={[json, setJson]}>
      {children}
    </JsonContext.Provider>
  );
}

export function useJson(): JsonContextType {
  const context = useContext(JsonContext);

  invariant(context, "useJson must be used within a JsonProvider");

  return context;
}
