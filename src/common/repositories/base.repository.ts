export abstract class BaseRepository<T> {
  protected constructor(protected readonly model: any) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findOne(filter: Record<string, any>): Promise<T | null> {
    return this.model.findOne(filter);
  }
}
