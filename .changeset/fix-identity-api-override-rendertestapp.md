---
'@backstage/core-app-api': patch
'@backstage/frontend-test-utils': patch
---

Fixed a bug where the `identityApi` override passed to `renderInTestApp` (via `mockApis.identity(...)`) was silently ignored, causing tests to receive the default guest identity instead of the custom `userEntityRef` specified.

`AppIdentityProxy.setTarget` now ignores subsequent calls once a target has been set, and exposes an `isTargetSet()` accessor. `renderInTestApp` uses this to set the identity proxy's target directly from the provided override before the app renders, so it can no longer be overwritten by the app's default guest-identity fallback.