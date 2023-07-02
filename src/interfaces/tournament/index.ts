import { TeamInterface } from 'interfaces/team';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TournamentInterface {
  id?: string;
  name: string;
  format: string;
  rules: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  team?: TeamInterface[];
  organization?: OrganizationInterface;
  _count?: {
    team?: number;
  };
}

export interface TournamentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  format?: string;
  rules?: string;
  organization_id?: string;
}
