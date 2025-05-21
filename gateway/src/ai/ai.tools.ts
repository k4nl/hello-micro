import { AiTool } from './ai.types';

export class AiTools {
  private tools: AiTool[];

  constructor() {
    this.tools = [
      {
        name: 'update-user',
        description: 'Atualiza os dados do usuario',
        parameters: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do usuario',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'create-user',
        description: 'Cria um novo usuario',
        parameters: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do usuario',
            },
            age: {
              type: 'integer',
              description: 'Idade do usuario',
            },
          },
          required: ['name', 'age'],
        },
      },
      {
        name: 'delete-user',
        description: 'Deleta um usuario',
        parameters: {
          type: 'object',
          properties: {
            user_id: {
              type: 'string',
              description: 'ID do usuario',
            },
          },
          required: ['user_id'],
        },
      },
    ];
  }

  getTools(): AiTool[] {
    return this.tools;
  }
}
