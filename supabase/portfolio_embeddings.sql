-- Enable pgvector extension
create extension if not exists vector;

-- Embeddings table
create table if not exists portfolio_embeddings (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(1536),
  metadata jsonb,
  source text,
  created_at timestamptz default now()
);

create index if not exists portfolio_embeddings_embedding_idx
on portfolio_embeddings
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

alter table portfolio_embeddings enable row level security;
create policy "Allow public read" on portfolio_embeddings for select using (true);

-- Similarity search function
create or replace function match_portfolio_embeddings(
  query_embedding vector(1536),
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  source text,
  similarity float
)
language sql stable as $$
  select
    id,
    content,
    metadata,
    source,
    1 - (embedding <=> query_embedding) as similarity
  from portfolio_embeddings
  order by embedding <=> query_embedding
  limit match_count;
$$;
