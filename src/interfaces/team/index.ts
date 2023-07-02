import { PlayerInterface } from 'interfaces/player';
import { TournamentInterface } from 'interfaces/tournament';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  name: string;
  tournament_id?: string;
  created_at?: any;
  updated_at?: any;
  player?: PlayerInterface[];
  tournament?: TournamentInterface;
  _count?: {
    player?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  tournament_id?: string;
}
