import { getFunctions, httpsCallable } from 'firebase/functions';

export async function setAdminRole(email: string) {
  const functions = getFunctions();
  const setAdminRoleFunction = httpsCallable<{ email: string }, { message: string }>(functions, 'setAdminRole');
  try {
    const result = await setAdminRoleFunction({ email });
    return result.data;
  } catch (error) {
    console.error('Error setting admin role:', error);
    throw error;
  }
}