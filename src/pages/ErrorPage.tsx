import { ErrorResponse } from '@remix-run/router';
import { useRouteError } from 'react-router-dom';

export function ErrorPage(): JSX.Element {
  const Error = useRouteError() as ErrorResponse;

  return (
    <div className="Error">
      <h1>Oops</h1>
      <p>Sorry, no such resource found.</p>
      <i>
        {Error.statusText}. {Error.data} {Error.status}
      </i>
    </div>
  );
}
