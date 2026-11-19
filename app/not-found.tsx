import { NotFoundScene } from '../components/sections';

export default function NotFound() {
  return (
    <NotFoundScene
      heading="This path isn’t here."
      body="The page you followed has moved or doesn’t exist. You can return to the shoreline at Home, or reach 24/7 support straight away."
      homeLabel="Return home"
      urgentLabel="Urgent help"
    />
  );
}
