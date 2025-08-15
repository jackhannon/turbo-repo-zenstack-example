import { getTeams } from '~/lib/teams/presenters/get-teams.presenter';

async function LandingRedirect({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const teams = await getTeams();
  console.log(teams);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default LandingRedirect;
