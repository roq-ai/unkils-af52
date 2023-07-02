const mapping: Record<string, string> = {
  organizations: 'organization',
  players: 'player',
  teams: 'team',
  tournaments: 'tournament',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
