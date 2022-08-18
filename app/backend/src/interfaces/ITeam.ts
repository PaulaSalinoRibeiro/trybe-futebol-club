export default interface ITeam {
  id: number;
  teamName: string;
}

export interface Team {
  listAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>
}
