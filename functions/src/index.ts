import { https } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

initializeApp();

export const setAdminRole = https.onCall(async (data, context) => {
  const { email } = data;
  console.log('Function called with data:', { email });
  console.log('Context:', context);

  // Check if the requester is allowed to set admin role
  if (!(context.auth?.token.admin === true)) {
    console.log('Permission denied: Requester is not an admin');
    throw new https.HttpsError('permission-denied', 'Only admins can set admin role');
  }

  console.log('Setting admin role for email:', email);
  
  try {
    const adminAuth = getAuth();
    console.log('Getting user by email');
    const user = await adminAuth.getUserByEmail(email);
    console.log('User found:', user);

    console.log('Setting custom user claims');
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });
    
    // Add user to admins collection in Firestore
    const db = getFirestore();
    console.log('Adding user to admins collection');
    await db.collection('admins').doc(user.uid).set({
      email: user.email,
      addedAt: FieldValue.serverTimestamp()
    });

    console.log('Admin role set successfully');
    return { message: `Successfully set admin role for user ${email}` };
  } catch (error) {
    console.error('Error setting admin role:', error);
    throw new https.HttpsError('internal', 'Error setting admin role');
  }
});