export class MeshResponse {
  constructor(
    public data: unknown,
    public message: unknown,
    public status: unknown,
    public code: number = 500
  ) {}
}
