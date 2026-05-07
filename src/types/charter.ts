export interface CharterVersion {
  version: number;
  content: string;
  mission: string;
  values: string[];
  approvedAt: Date;
  approvedBy: string;
}

export interface Charter {
  id: string;
  spaceId: string;
  currentVersion: number;
  versions: CharterVersion[];
}
