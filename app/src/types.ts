import {RichInterfaceResponse} from "./service/richInterface/types.ts"

export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
    images?: string[];
}

interface Options {
  num_keep?: number;
  seed?: number;
  num_predict?: number;
  top_k?: number;
  top_p?: number;
  tfs_z?: number;
  typical_p?: number;
  repeat_last_n?: number;
  temperature?: number;
  repeat_penalty?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  mirostat?: number;
  mirostat_tau?: number;
  mirostat_eta?: number;
  penalize_newline?: boolean;
  stop?: string[];
  numa?: boolean;
  num_ctx?: number;
  num_batch?: number;
  num_gpu?: number;
  main_gpu?: number;
  low_vram?: boolean;
  f16_kv?: boolean;
  vocab_only?: boolean;
  use_mmap?: boolean;
  use_mlock?: boolean;
  num_thread?: number;
}

export interface ChatRequest {
    model: string;
    messages: Message[];
    format?: "json";
    options?: Options;
    template?: string;
    stream?: boolean;
}

export interface ChatHistory {
    title: string,
    messages: Message[]
    richInterfaces: { [index: number]: RichInterfaceResponse[] }
}