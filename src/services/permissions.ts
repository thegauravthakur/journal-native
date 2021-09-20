import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
  Permission,
  openSettings,
} from 'react-native-permissions';

export const checkAndRequestPermission = async () => {
  const status = await checkMultiple([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]);
  if (
    status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.BLOCKED ||
    status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.BLOCKED
  ) {
    await openSettings();
    return false;
  }
  const permissionsToRequest: Permission[] = [];
  if (status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !== RESULTS.GRANTED)
    permissionsToRequest.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  if (status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] !== RESULTS.GRANTED)
    permissionsToRequest.push(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  if (permissionsToRequest.length === 0) return true;

  const result = await requestMultiple(permissionsToRequest);
  return (
    result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED &&
    result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED
  );
};

export const checkIfPermissionAreGranted = async (
  openSettingsIfBlocked: boolean = true,
) => {
  const status = await checkMultiple([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]);
  if (
    (status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.BLOCKED ||
      status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.BLOCKED) &&
    openSettingsIfBlocked
  ) {
    await openSettings();
    return false;
  }
  return (
    status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'granted' &&
    status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
  );
};
