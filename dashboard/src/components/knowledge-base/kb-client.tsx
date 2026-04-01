'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconSearch,
  IconDatabase,
  IconFileText,
  IconBook2,
} from '@tabler/icons-react';
import { KnowledgeBaseView } from './kb-view';

interface SearchResult {
  content: string;
  score: number;
  source_file: string;
  doc_type: string;
  filename: string;
  collection: string;
}

interface Collection {
  name: string;
  count: number;
}

interface KnowledgeBaseClientProps {
  org: string;
  markdownContent: string;
  filePath: string;
}

export function KnowledgeBaseClient({ org, markdownContent, filePath }: KnowledgeBaseClientProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [collectionsLoaded, setCollectionsLoaded] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({ q: query, limit: '10', scope: 'all', org });
      const res = await fetch(`/api/kb/search?${params}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const loadCollections = async () => {
    if (collectionsLoaded || !org) return;
    setCollectionsLoading(true);
    try {
      const res = await fetch(`/api/kb/collections?org=${encodeURIComponent(org)}`);
      if (res.ok) {
        const data = await res.json();
        setCollections(data.collections || []);
      }
    } catch {
      // ignore
    } finally {
      setCollectionsLoading(false);
      setCollectionsLoaded(true);
    }
  };

  const typeIcon = (type: string) => {
    if (type.includes('video')) return 'video';
    if (type.includes('image')) return 'image';
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('audio')) return 'audio';
    return 'text';
  };

  return (
    <Tabs defaultValue="search">
      <TabsList variant="line">
        <TabsTrigger value="search">
          <IconSearch size={14} className="mr-1.5" />
          Search
        </TabsTrigger>
        <TabsTrigger value="browse">
          <IconBook2 size={14} className="mr-1.5" />
          Knowledge File
        </TabsTrigger>
        <TabsTrigger value="collections" onClick={loadCollections}>
          <IconDatabase size={14} className="mr-1.5" />
          Collections
        </TabsTrigger>
      </TabsList>

      {/* Search Tab */}
      <TabsContent value="search" className="space-y-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search knowledge base... (e.g. 'how does the heartbeat work?')"
                  className="w-full rounded-md border bg-background pl-9 pr-4 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={searching || !query.trim()}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
            {results.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  No results found. Try a different query or ingest more content.
                </CardContent>
              </Card>
            ) : (
              results.map((result, i) => (
                <Card key={i} className="hover:bg-muted/20 transition-colors">
                  <CardContent className="py-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        {typeIcon(result.doc_type)}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {result.collection}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground ml-auto tabular-nums">
                        {(result.score * 100).toFixed(0)}% match
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{result.content}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <IconFileText size={12} />
                      {result.filename || result.source_file}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {!searched && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <IconSearch size={24} className="text-muted-foreground/50" />
              </div>
              <h3 className="text-sm font-medium mb-1">Search your knowledge base</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                Ask questions in natural language. The RAG engine searches across all ingested
                content including documents, videos, images, and audio.
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Browse Tab - existing markdown editor */}
      <TabsContent value="browse">
        <KnowledgeBaseView
          content={markdownContent}
          org={org}
          filePath={filePath}
        />
      </TabsContent>

      {/* Collections Tab */}
      <TabsContent value="collections">
        {collectionsLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-lg bg-muted/30 animate-pulse" />
            ))}
          </div>
        ) : collectionsLoaded && collections.length > 0 ? (
          <div className="space-y-2">
            {collections.map((col) => (
              <Card key={col.name}>
                <CardContent className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconDatabase size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium font-mono">{col.name}</span>
                  </div>
                  <Badge variant="secondary">{col.count} docs</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : collectionsLoaded ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <IconDatabase size={24} className="text-muted-foreground/50" />
              </div>
              <h3 className="text-sm font-medium mb-1">No collections yet</h3>
              <p className="text-xs text-muted-foreground max-w-sm mb-4">
                Run the setup script and ingest content to create collections.
              </p>
              <div className="rounded-lg bg-muted/50 p-3 text-left max-w-xs w-full">
                <p className="text-[10px] font-medium text-muted-foreground mb-1">Setup:</p>
                <pre className="text-[10px] font-mono text-muted-foreground">
{`bash $CTX_FRAMEWORK_ROOT/bus/kb-setup.sh
bash $CTX_FRAMEWORK_ROOT/bus/kb-ingest.sh <path>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </TabsContent>
    </Tabs>
  );
}
