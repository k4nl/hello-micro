import { User } from '@k4nl/core';

export type Conversation = {
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  user: User;
};

export type GenerateTextResponse = {
  type: 'tool_call' | 'error' | 'reply';
  content?: string;
  data: {
    id: string;
    function: {
      name: string;
      description: string;
      parameters: {
        type: string;
        properties: Record<string, any>;
        required: string[];
      };
    };
  }[];
};

export type AiTool = {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
};
