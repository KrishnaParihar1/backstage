import { useCallback, useEffect, useState } from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { mockApis, TestApiProvider } from '@backstage/frontend-test-utils';
import {
  useAnalytics,
  createRouteRef,
  createExternalRouteRef,
  useRouteRef,
  identityApiRef,
  useApi,
} from '@backstage/frontend-plugin-api';
import { Routes, Route } from 'react-router-dom';
import { renderInTestApp } from './renderInTestApp';

// ... existing 6 tests unchanged ...

  it('should use the overridden identity API instead of the default proxy', async () => {
    const IdentityPage = () => {
      const identityApi = useApi(identityApiRef);
      const [userEntityRef, setUserEntityRef] = useState<string>();
      useEffect(() => {
        identityApi.getBackstageIdentity().then(identity => setUserEntityRef(identity.userEntityRef));
      }, [identityApi]);
      return <div>{userEntityRef ?? 'Loading...'}</div>;
    };
    renderInTestApp(<IdentityPage />, {
      apis: [mockApis.identity({ userEntityRef: 'user:default/i-just-made-this-up' })],
    });
    expect(await screen.findByText('user:default/i-just-made-this-up')).toBeInTheDocument();
  });

  it('should render with test user entity when no custom value provided', async () => {
    // same IdentityPage pattern, apis: [mockApis.identity()]
    // expect(await screen.findByText('user:default/test'))...
  });

  it('should not render guest user entity when custom identity is provided', async () => {
    // same IdentityPage pattern with override
    // await screen.findByText('user:default/i-just-made-this-up');
    // expect(screen.queryByText('user:default/guest')).not.toBeInTheDocument();
  });
});