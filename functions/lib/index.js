import * as firebase_functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp();

export const addAdminRole = firebase_functions.https.onCall(async (data, context) => {
    // Check if the request is made by an admin
    if (context.auth?.token.admin !== true) {
        throw new firebase_functions.https.HttpsError('permission-denied', 'Only admins can add other admins');
    }

    if (!data.email) {
        throw new firebase_functions.https.HttpsError('invalid-argument', 'Email must be provided');
    }

    try {
        const auth = getAuth();
        const user = await auth.getUserByEmail(data.email);
        await auth.setCustomUserClaims(user.uid, { admin: true });
        console.log(`Admin role added to user: ${data.email}`);
        return { message: `Success! ${data.email} has been made an admin.` };
    } catch (error) {
        console.error('Error adding admin role:', error);
        if (error.code === 'auth/user-not-found') {
            throw new firebase_functions.https.HttpsError('not-found', 'User not found');
        }
        throw new firebase_functions.https.HttpsError('internal', 'Error adding admin role');
    }
});
