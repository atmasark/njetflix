import StatusMessage from '../components/StatusMessage';
import { PageContainer, PrimaryButton } from '../styles/shared';

export default function NotFound() {
  return (
    <PageContainer>
      <title>Page not found · Njetflix</title>
      <StatusMessage
        emoji="🍿"
        title="This page njet found"
        action={<PrimaryButton to="/">Back to the movies</PrimaryButton>}
      >
        The page you were looking for doesn't exist.
      </StatusMessage>
    </PageContainer>
  );
}
