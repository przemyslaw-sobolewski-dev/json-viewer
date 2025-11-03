/// <reference lib="WebWorker" />
import { JSONHeroSearch } from "@jsonhero/fuzzy-json-search";
import { inferType } from "@jsonhero/json-infer-types";
import { formatValue } from "../utilities/formatter";

type SearchWorker = {
  searcher?: JSONHeroSearch;
};

type InitializeIndexEvent = {
  type: "initialize-index";
  payload: { json: unknown };
};

type SearchEvent = {
  type: "search";
  payload: { query: string };
};

type SearchWorkerEvent = InitializeIndexEvent | SearchEvent;

function valueFormatter(value: unknown): string | undefined {
  const inferredType = inferType(value);
  return formatValue(inferredType);
}

// Worker code as a function that will be stringified
export function createSearchWorker() {
  const workerCode = `
    importScripts('https://cdn.jsdelivr.net/npm/@jsonhero/fuzzy-json-search/dist/index.js');
    importScripts('https://cdn.jsdelivr.net/npm/@jsonhero/json-infer-types/dist/index.js');
    
    const self = globalThis;
    let searcher = undefined;
    
    function inferType(value) {
      // Basic type inference fallback
      if (value === null) return { name: 'null' };
      if (value === undefined) return { name: 'undefined' };
      if (typeof value === 'boolean') return { name: 'boolean' };
      if (typeof value === 'number') return { name: 'number' };
      if (typeof value === 'string') return { name: 'string' };
      if (Array.isArray(value)) return { name: 'array' };
      if (typeof value === 'object') return { name: 'object' };
      return { name: 'unknown' };
    }
    
    function formatValue(inferredType) {
      return inferredType?.name || 'unknown';
    }
    
    function valueFormatter(value) {
      const inferredType = inferType(value);
      return formatValue(inferredType);
    }

    self.onmessage = function(e) {
      const { type, payload } = e.data;

      console.group('SearchWorker: ' + type);
      console.log(payload);

      switch (type) {
        case 'initialize-index': {
          const { json } = payload;

          try {
            // Try to use JSONHeroSearch if available
            if (typeof JSONHeroSearch !== 'undefined') {
              searcher = new JSONHeroSearch(json, {
                cacheSettings: { max: 100, enabled: true },
                formatter: valueFormatter,
              });
              searcher.prepareIndex();
            }
          } catch (error) {
            console.error('Failed to initialize search:', error);
          }

          self.postMessage({ type: 'index-initialized' });
          break;
        }
        case 'search': {
          const { query } = payload;

          if (!searcher) {
            console.warn('Search index not initialized');
            self.postMessage({
              type: 'search-results',
              payload: { results: [], query },
            });
            return;
          }

          const start = performance.now();
          const results = searcher.search(query);
          const end = performance.now();

          console.log('Search took ' + (end - start) + 'ms');
          console.log('results', results);

          self.postMessage({
            type: 'search-results',
            payload: { results, query },
          });
          break;
        }
      }

      console.groupEnd();
    };
  `;

  const blob = new Blob([workerCode], { type: "application/javascript" });
  return new Worker(URL.createObjectURL(blob));
}
